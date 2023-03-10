const Schema = require("mongoose").Schema;

const watchSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    price: { type: Number, require: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = watchSchema;