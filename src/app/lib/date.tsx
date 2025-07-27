export function getDateDifference(targetDate: Date): string {
  const now = new Date();

  const yearDiff = targetDate.getFullYear() - now.getFullYear();
  const monthDiff = targetDate.getMonth() - now.getMonth();
  const dayDiff = targetDate.getDate() - now.getDate();

  let totalMonths = yearDiff * 12 + monthDiff;

  // Si le jour du mois n'est pas encore passé, on ne compte pas le mois courant
  if (dayDiff < 0) {
    totalMonths -= 1;
  }

  // Si différence >= 1 mois, on retourne les mois
  if (totalMonths !== 0) {
    return `${totalMonths} mois`;
  }

  // Sinon, on retourne le nombre de jours (arrondi à l'entier le plus proche)
  const oneDayMs = 24 * 60 * 60 * 1000;
  const diffInMs = targetDate.getTime() - now.getTime();
  const totalDays = Math.round(diffInMs / oneDayMs);

  return `${totalDays} jours`;
}

export function getDifference(targetDate: Date): {
  years: number;
  months: number;
  days: number;
  isPast: boolean;
  totalMonths: number;
  totalDays: number;
} {
  const now = new Date();
  const isPast = targetDate.getTime() < now.getTime();

  let years = targetDate.getFullYear() - now.getFullYear();
  let months = targetDate.getMonth() - now.getMonth();
  let days = targetDate.getDate() - now.getDate();

  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(targetDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const daysInPrevMonth = new Date(
      prevMonth.getFullYear(),
      prevMonth.getMonth() + 1,
      0
    ).getDate();
    days += daysInPrevMonth;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  const diffInMs = targetDate.getTime() - now.getTime();
  const totalDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));

  return {
    years,
    months,
    days,
    isPast,
    totalMonths,
    totalDays,
  };
}