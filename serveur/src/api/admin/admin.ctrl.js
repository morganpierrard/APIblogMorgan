import Admin from './adminModel'
import adminService from './admin.service'
import Joi from 'joi'

export default {
  async signup(req, res){
    try{
      const { value, error} = adminService.validateSignup(req.body);
      if(error){
        return res.status(400).json(error)
      }
      const encryptedPass = adminService.encryptedPass(value.password)

      const admin = await Admin.create({
        firstname:value.firstname,
        lastname:value.lastname,
        email:value.email,
        password:encryptedPass,
      });
      return res.json({success:true});
    }catch(err){
      console.error(err);
      return res.status(500).send(err);
    }
    return res.json(value)
  },

  async login(req, res){
    try{
      const { value, error } = adminService.validateLogin(req.body);
      if(error){
        return res.status(400).json(error)
      }
      const admin = await Admin.findOne({email:value.email});
      if(!admin){
        return res.status(401).json({err: "not authorized"})
      }
      const authenticated = adminService.comparePassword(
        value.password,
        admin.password
      );
      if(!authenticated){
        return res.status(401).json({err:"not auhtorized"});
      }
      return res.json({success:true})
    }catch(err){
      console.error(err);
      return res.status(500).send(err)
    }
  },
  authenticated(req, res){
    return res.json(req.admin)
  },
  async findAll(req, res) {
         try {
           const admin = await Admin.find({})
           if (!admin) {
             return res.status(404).json({err: 'could not find article'})
           }
           res.json(admin)
         } catch (err) {
             console.error(err)
             return res.status(500).send(err)
         }
    },
    async update(req, res) {
           try {
               const {
                   id
               } = req.params //le password n'est pas crypté à son changement
               const schema = Joi.object().keys({
                   firstname: Joi.string().required(),
                   lastname: Joi.string().required(),
                   email: Joi.string().email().required(),
                   password: Joi.string().required(),
               })
               const {value, error} = Joi.validate(req.body, schema)
               if (error && error.details) {
                   return res.status(400).json(error)
               }
               const admin = await Admin.findByIdAndUpdate({
                   _id: id
               }, value, {
                   new: true
               });
               if (!admin) {
                   return res.status(404).json({
                       err: 'could not find a customer'
                   })
               }
               return res.json(admin)
           } catch (err) {
               console.error(err)
               return res.status(500).send(err)
           }
    },
    async delete(req, res) {
        try {
            const {id} = req.params
            const admin = await Admin.findByIdAndRemove({
                _id: id
            })
            if (!admin) {
                return res.status(404).json({
                    err: 'no customer found'
                })
            }
            return res.json({
                msg: 'customer deleted'
            })
        } catch (err) {
            console.error(err)
            return res.status(500).send(err)
        }
    }
};
