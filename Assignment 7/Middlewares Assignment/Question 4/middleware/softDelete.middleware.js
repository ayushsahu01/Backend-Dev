module.exports = function softDeletePlugin(schema) {

    schema.add({
        isDeleted: { type: Boolean, default: false },
        deletedAt: { type: Date, default: null }
    });

    schema.pre(/^find/, function (next) {
        this.where({ isDeleted: false });
        next();
    });

    schema.pre("findOneAndDelete", async function (next) {
        const doc = await this.model.findOne(this.getQuery());

        if (doc) {
            await this.model.updateOne(
                { _id: doc._id },
                { isDeleted: true, deletedAt: new Date() }
            );
        }

        this.setQuery({ _id: null });
        next();
    });
};