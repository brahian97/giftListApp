export const parseGiftListDate = (date) => {
  const user_date = new Date(date);
  const system_date = new Date();
  
  const diff = Math.floor((system_date - user_date) / 1000);
  if (diff <= 1) {return 'justo ahora';}
  if (diff < 20) {return 'hace' + diff + ' segundos';}
  if (diff < 40) {return 'hace medio minuto';}
  if (diff < 60) {return 'hace menos de un minuto';}
  if (diff <= 90) {return 'hace un minuto';}
  if (diff <= 3540) {return 'hace ' + Math.round(diff / 60) + ' minutos';}
  if (diff <= 5400) {return 'hace 1 hora';}
  if (diff <= 86400) {return 'hace ' + Math.round(diff / 3600) + ' horas';}
  if (diff <= 129600) {return 'hace un día';}
  if (diff < 604800) {return 'hace' + Math.round(diff / 86400) + ' días';}
  if (diff <= 777600) {return 'hace 1 semana';}
  return system_date;
}