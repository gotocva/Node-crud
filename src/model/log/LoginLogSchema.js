
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginLogSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },  
  is_mobile: {
    type: Boolean,
    required: true
  },
  is_desktop:{
    type: Boolean,
    required: true,
  },
  ip_address: {
    type: String,
    required: true
  },
  user_agent: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });


class LoginLogDao {
    static async log(req){
        let user_agent = req.useragent.browser || "browser unknown";
        user_agent += " "+req.useragent.version || "version unknown";
        user_agent += " "+req.useragent.os || "os unknown";
        user_agent += " "+req.useragent.platform || "platform unknown";
        let clientInfo = {};
            clientInfo.ip_address = req.connection.remoteAddress;
            clientInfo.user_agent = user_agent;
            clientInfo.is_mobile = req.useragent.isMobile;
            clientInfo.is_desktop = req.useragent.isDesktop;
            clientInfo.user = req.user;
        let log = await new this(clientInfo).save();
        return log.toObject();
    }
}

LoginLogSchema.loadClass(LoginLogDao);

module.exports = mongoose.model('LoginLog', LoginLogSchema);