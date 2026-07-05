window.onload = function(){

  const user = JSON.parse(
    localStorage.getItem('disastersafe_current_user') || '{}'
  );

  const name = user.name || 'Student';
  const email = user.email || '—';
  const college = user.college || '—';
  const reg = user.registerNo || '—';

  document.getElementById('studentName').textContent = name;
  document.getElementById('studentEmail').textContent = email;
  document.getElementById('studentCollege').textContent = college;
  document.getElementById('studentReg').textContent = reg;

  document.getElementById('navName').textContent =
      'Welcome, ' + name.split(' ')[0];

  const initials = name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0,2);

  document.getElementById('photoInitials').textContent = initials;
  document.getElementById('navInitials').textContent = initials[0];
};

function startLearning(){
    window.location.href = "disaster.html";
}
function goToDisasterPortal(){
    window.location.href = "disaster.html";
}
