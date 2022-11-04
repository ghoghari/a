const Tables = {
	lotbidtbl: ["bidtype"],
	postSaleReport: ["lotname", "lotstatus", "description", "campaignName", "customerName"],
	bidActivityReport: ["lotname", "bidtype", "winningbid"],
	clientReport: ["customerName", "campaignName", "lotname", "lotcontent"]
};

exports.FilterQuery = (filterString, tableKey) => {
	if (filterString && filterString.length > 0) {
		const keys = Tables[tableKey];
		const syntax = [];
		keys.forEach((ele) => {
			syntax.push({ [ele]: { $regex: filterString, $options: "i" } });
		});
		return { $or: syntax };
	}
};