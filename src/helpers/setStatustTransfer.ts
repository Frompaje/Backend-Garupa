export function setStatustTransfer(expected_on: string): string {
  const today = new Date();
  const dueDate = new Date(expected_on);

  today.setHours(0, 0, 0, 0);

  dueDate.setDate(dueDate.getDate() + 1);

  if (today >= dueDate) {
    return "Recusado";
  } else if (new Date(expected_on) > today) {
    return "Em análise";
  } else {
    return "Aprovado";
  }
}
