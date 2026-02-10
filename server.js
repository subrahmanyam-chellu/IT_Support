const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const AppUser = require('./models/AppUser');
const AppTicket = require('./models/AppTicket');
const authToken = require('./middlewares/authToken');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config({ quiet: true });

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.listen(process.env.PORT||5000, () => { console.log("Server Started......") });
mongoose.connect(process.env.MONGO)
    .then(() => console.log("database connected"))
    .catch((err) => { console.log(err) });

app.get('/', (req, res) => {
    return res.status(200).send("hello welocme to server");
})

app.post('/register', async (req, res) => {
    try {
        let { name, email, password} = req.body;
        const role = "user";
        const hashedPassword = await bcrypt.hash(password, 12);
        const exists = await AppUser.findOne({ email });
        if (exists) {
            return res.status(403).json({message:"user already registered"});
        }
        const newUser = new AppUser({
            name, email, password: hashedPassword, role
        });
        newUser.save();
        return res.status(200).json({message:"user is registered successfully"});

    } catch (err) {
        res.status(500).send({message:"internal server error"});
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await AppUser.findOne({ email });
        if (!user) {
            return res.status(404).json({message:"user not found"});
        }
        const verified = await bcrypt.compare(password, user.password);
        if (verified) {
            const token = jwt.sign(
                {user: user},
                process.env.JWT_PASSWORD,
                { expiresIn: '24h' }
            );
            return res.status(200).json({
                user: user,
                token: token,
            });
        }
        else {
            return res.status(403).json({message:"invalid credentials"});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({message:"internal server error"});
    }
})

app.get('/allusers', authToken, async (req, res) => {
    try {
        //console.log(req.user);
        let allUsers = await AppUser.find();
        return res.status(200).json(allUsers);

    } catch (err) {
        return res.status(500).send(err);
    }

})

app.post('/createticket', authToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    const createdBy = req.user.user.email;
    const status = "open";

    const response = await axios.post(
      `${process.env.MODEL_URl}/predict`,
      { issue: description },
      { headers: { "Content-Type": "application/json" } }
    );

    const predict = response.data;
    if (!predict) {
      return res.status(502).send("Prediction service failed");
    }

    const ticket = new AppTicket({
      ticketId: predict.ticket_id,
      title,
      description,
      category: predict.predicted_category,
      priority: predict.predicted_priority,
      time: predict.tStamp,
      createdBy,
      status
    });

    const result = await ticket.save();
    if (result) {
      return res.status(201).send("Ticket submitted successfully");
    } else {
      return res.status(500).send("Internal server error due to Mongo");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
});

app.get('/alltickets', authToken, async (req, res) => {
    try {
        //console.log(req.user.user.email);
        const allTickets = await AppTicket.find();
        if (allTickets) {
            res.status(200).json({
                allTickets
            });
        }
        else {
            res.status(404).send("not found");
        }

    } catch (err) {
        res.status(500).send("internal server error");
    }

})

app.delete('/delete/:id', authToken, async (req, res) => {
    try {
        const ticketId = req.params.id;
        const role = req.user.user.role;
        if (role === "admin") {
            try {
                await AppTicket.deleteOne({ ticketId });
                res.status(200).send(`successfully deleted the ticket ${ticketId}`);
            } catch (err) {
                res.status(500).send("internal server error");
            }
        } else {
            res.status(403).send("you have no rights to do it");
        }

    } catch (err) {
        res.status(500).send("internal server error");
    }
})

app.get('/counts', authToken, async (req, res) => {
    try {
        const role = req.user.user.role;
        if (role === "admin") {
            const allCount = await AppTicket.countDocuments();
            const rCount = await AppTicket.countDocuments({ status: "resolved" });
            const pCount = allCount - rCount;
            res.status(200).json({
                allCount: allCount,
                rCount: rCount,
                pCount: pCount
            })
        } else {
            res.status(403).send("you have no right to get it");
        }

    } catch (err) {
        res.status(500).send("internal server error");
    }
})

app.get('/gettickets', authToken, async(req, res)=>{
    try{
        const tickets = await AppTicket.find({createdBy: req.user.user.email});
        res.status(200).json({tickets: tickets});
        //console.log(tickets);
    }catch(err){
        res.status(500).json({message:"internal server error"});
    }
})

app.delete('/deleteall', authToken, async(req, res)=>{
    try{
        if(req.user.user.role=='admin'){
            await AppTicket.deleteMany({status:'resolved'});
            res.status(200).json({message:'deleted successfully'});
        }else{
            res.status(403).json({message:'you have no rights to do this'});
        }
    }catch(err){
        res.status(500).json({message:'internal server error'});
    }
})

app.patch('/updateticket/:id', authToken, async (req, res) => {
  const ticketId = req.params.id;
  const status = req.body.status;

  if (req.user.user.role === 'admin') {
    try {
      const result = await AppTicket.updateOne({ ticketId: ticketId }, { $set: { status: status } });

      if (result.modifiedCount > 0) {
        res.json({ message: 'Successfully updated' });
      } else {
        res.status(404).json({ message: 'Ticket not found or already has this status' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Internal server error', error: err });
    }
  } else {
    res.status(403).json({ message: 'You have no rights to this' });
  }
});

app.get('/model', async(req, res)=>{
    const response = await axios.get(process.env.MODEL_URl);
    if(response.status==200){
        res.status(200).send('okay');
    }

});

app.post('/model/predict', async (req, res) => {
  try {

    const response = await axios.post(
      `${process.env.MODEL_URL}/predict`,
      { issue: req.body.issue },   // ✅ send plain string
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error("Error from model service:", err.response?.data || err.message);
    res.status(err.response?.status || 500).json({
      error: err.response?.data || "Internal server error"
    });
  }
});

// console.log(jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5NzVlNWIzNTlhYTJjZWIzM2M3YjhjOSIsIm5hbWUiOiJzdWJyYWhtYW55YW0iLCJlbWFpbCI6InN1YnJhaG1hbnlhbWNoZWxsdUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTc2OTYwOTQ2NSwiZXhwIjoxNzY5Njk1ODY1fQ.y5Pb7s3NYXYQON8GaL8D2OcuqyCVRoNKpmFeg36LiOk"));