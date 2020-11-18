const admin = require('firebase-admin');
admin.initializeApp();

const database = admin.firestore();

exports.addData=(req,res)=>{
    let UserData={
        "FirstName":req.body.firstname,
        "LastName":req.body.lastname,
        "Username":req.body.username,
        "Password":req.body.password,
        "ConfirmPass":req.body.ConfirmPassword
    }
    database.collection('AppTecTask').doc(req.body.username).set(UserData)
    .then(result=>{
        res.status(201).send("data store");
        res.status(201).send(result);
        return result;
    })
    .catch(err=>{
        //console.log(err);
        res.status(err.code).json({
            message: `Something worng. $(error.message)`
          })
    })
}
exports.getData=(req,res)=>{
    let DataArr=[];
    database.collection('AppTecTask').get()
    .then((querySnapshot)=>{
        querySnapshot.forEach((doc)=> {
          const FirstName=doc.data().FirstName
          const LastName=doc.data().LastName
          const Username=doc.data().Username
          const id=doc.id
          DataArr.push({
              id,
            FirstName,
            LastName,
            Username
          });
        });
        
        res.status(200).json(DataArr)
        return null;

      }).catch((error) => {
        console.log(error);
        res.status(200).send(error)
      })
}
exports.deleteData=(req,res)=>{
    database.collection('AppTecTask').doc(req.params.id).delete()
    .then(()=>res.status(204).send("Document successfully deleted!"))
    .catch((error) =>{
            res.status(500).send(error);
    });
  }