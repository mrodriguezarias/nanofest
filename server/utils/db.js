import { objectUtils } from "./"

const dbUtils = {
  find: async (Model, filters = {}) => {
    const res = await Model.find(filters)
    return res.map((r) => objectUtils.replaceKey(r.toObject(), "_id", "id"))
  },
  findOne: async (Model, filters = {}) => {
    const res = await Model.findOne(filters)
    return res ? objectUtils.replaceKey(res.toObject(), "_id", "id") : null
  },
  create: async (Model, data) => {
    const model = new Model(data)
    const res = await model.save()
    if (res && res._id) {
      return objectUtils.replaceKey(res.toObject(), "_id", "id")
    } else {
      return null
    }
  },
  updateOne: async (Model, filters, data) => {
    filters = objectUtils.replaceKey(filters, "id", "_id")
    const res = await Model.findOneAndUpdate(
      filters,
      { $set: data },
      { new: true },
    )
    return objectUtils.replaceKey(res.toObject(), "_id", "id")
  },
  update: async (Model, filters, data) => {
    filters = objectUtils.replaceKey(filters, "id", "_id")
    await Model.updateMany(filters, { $set: data })
    const res = await Model.find({ ...filters, ...data })
    return res.map((r) => objectUtils.replaceKey(r.toObject(), "_id", "id"))
  },
  delete: async (Model, filters) => {
    filters = objectUtils.replaceKey(filters, "id", "_id")
    return await Model.deleteMany(filters)
  },
}

export { dbUtils }
export default dbUtils
