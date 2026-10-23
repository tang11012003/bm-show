function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>{t.classList.remove('show')},2200);
}

function clearCache(){
  showToast('已清理缓存 12.8MB');
}

function toggleNotify(el){
  showToast(el.checked?'已开启诊断完成通知':'已关闭诊断完成通知');
}

function showLogoutModal(){
  document.getElementById('logoutModal').classList.add('show');
}

function hideLogoutModal(){
  document.getElementById('logoutModal').classList.remove('show');
}

function closeModal(e){
  if(e.target.classList.contains('modal-mask')) hideLogoutModal();
}

function doLogout(){
  localStorage.clear();
  window.location.href='login.html';
}