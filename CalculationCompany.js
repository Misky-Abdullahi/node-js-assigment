function calculateTotalTarget(startDate, endDate, totalAnnualTarget, excludedDays = [5]) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const daysExcluding = [];
    const daysWorked = [];
    const monthlyTargets = [];

    let totalWorkingDays = 0;

    for (
        let current = new Date(start.getFullYear(), start.getMonth());
        current <= end;
        current.setMonth(current.getMonth() + 1)
    ) {
        const firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
        const lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);

        let workingDaysCount = 0;
        let workedDaysCount = 0;

        for (let day = firstDay; day <= lastDay; day.setDate(day.getDate() + 1)) {
            if (excludedDays.includes(day.getDay())) continue;
            workingDaysCount++;

            if (day >= start && day <= end) {
                workedDaysCount++;
            }
        }

        daysExcluding.push(workingDaysCount);
        daysWorked.push(workedDaysCount);
        totalWorkingDays += workingDaysCount;

        const monthlyTarget = (workedDaysCount > 0) 
            ? (totalAnnualTarget / totalWorkingDays) * workedDaysCount 
            : 0;

        monthlyTargets.push(monthlyTarget);
    }

    const totalTarget = monthlyTargets.reduce((sum, target) => sum + target, 0);

    return {
        daysExcluding,
        daysWorked,
        monthlyTargets,
        totalTarget
    };
}

// Example usage
const result = calculateTotalTarget('2024-01-01', '2024-03-31', 435);
console.log(result);