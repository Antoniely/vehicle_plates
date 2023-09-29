const { Router } = require('express');

// import controllers
const CTRLPlate = require("../controllers/platesControllers")

const router = Router();


// Creando las rutas para c/ end-point
router.get('/get-all-plates', CTRLPlate.getAllPlates);

router.post('/create', CTRLPlate.postCreatePlate);

router.put('/update', CTRLPlate.putPlate);

router.delete('/delete/:id', CTRLPlate.deletePlate);


module.exports = router;