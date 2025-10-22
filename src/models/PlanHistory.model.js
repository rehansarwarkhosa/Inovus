import mongoose from "mongoose";
const { Schema } = mongoose;

const PlanHistorySchema = new Schema(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: 'User',
         required: true,
         index: true,
      },
      planId: {
         type: Schema.Types.ObjectId,
         ref: 'Plan',
         required: true,
         index: true,
      },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
      snapshotPlanName: { type: String },
      snapshotPrice: { type: Number },
      snapshotCurrency: { type: String }
   },
   { timestamps: true }
);

const PlanHistory = mongoose.models.PlanHistory || mongoose.model('PlanHistory', PlanHistorySchema);
export default PlanHistory;
