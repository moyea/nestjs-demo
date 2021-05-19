const mongoose = require('mongoose');
require('mongoose-long')(mongoose);

export const Long = mongoose.Schema.Types.Long;

export type Long = typeof Long;
