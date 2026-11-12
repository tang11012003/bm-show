const typeColors = { gaokao: '#E53935', mock_exam: '#FF6D00', registration: '#1565C0', physical_exam: '#43A047', custom: '#9C27B0', volunteer: '#FBC02D' };
const today = new Date();
let focusedYear = today.getFullYear(), focusedMonth = today.getMonth();
let selectedDate = new Date(today);

let mockEvents = JSON.parse(localStorage.getItem('userScheduleEvents') || 'null') || [
  { id: 'ev-1', title: '期中综合考试', date: '2026-08-04', type: 'mock_exam', subject: '全科', students: ['张小明'], hasReport: true },
  { id: 'ev-2', title: '考前家长会', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()+5).padStart(2,'0')}`, type: 'custom', subject: '', students: ['张小明', '刘小五'] },
  { id: 'ev-3', title: '选科意向预填报', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()+8).padStart(2,'0')}`, type: 'registration', subject: '', students: ['张小明'] },
  { id: 'ev-4', title: '数学专项模考', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()+12).padStart(2,'0')}`, type: 'mock_exam', subject: '数学', students: ['张小明'] }
];

function saveEventsToStorage() {
  localStorage.setItem('userScheduleEvents', JSON.stringify(mockEvents));
}

const templates = [
  { name: '模拟考试', icon: 'assignment', type: 'mock_exam' },
  { name: '家长会', icon: 'people', type: 'custom' },
  { name: '填报志愿', icon: 'school', type: 'volunteer' }
];

function getEventsForDate(d) {
  const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  return mockEvents.filter(e => e.date === ds);
}

function renderCalendar() {
  const firstDay = new Date(focusedYear, focusedMonth, 1);
  const lastDay = new Date(focusedYear, focusedMonth + 1, 0);
  let startDow = firstDay.getDay(); if (startDow === 0) startDow = 7;
  startDow--;
  const daysInMonth = lastDay.getDate();
  const prevMonth = new Date(focusedYear, focusedMonth, 0);
  const prevDays = prevMonth.getDate();

  let cells = '';
  for (let i = startDow - 1; i >= 0; i--) {
    cells += `<div class="cal-day other-month"><span class="day-num">${prevDays - i}</span></div>`;
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(focusedYear, focusedMonth, d);
    const isToday = date.toDateString() === today.toDateString();
    const isSelected = date.toDateString() === selectedDate.toDateString();
    const evts = getEventsForDate(date);
    let dotsHtml = '';
    if (evts.length > 0) {
      const dots = evts.slice(0, 3).map(e => `<span class="dot" style="background:${typeColors[e.type]||'#9E9E9E'}"></span>`).join('');
      dotsHtml = `<div class="dots">${dots}</div>`;
    }
    const cls = ['cal-day'];
    if (isToday) cls.push('today');
    if (isSelected) cls.push('selected');
    cells += `<div class="${cls.join(' ')}" onclick="selectDay(${d})"><span class="day-num">${d}</span>${dotsHtml}</div>`;
  }
  const totalCells = startDow + daysInMonth;
  const remaining = totalCells % 7 === 0 ? 0 : 7 - totalCells % 7;
  for (let i = 1; i <= remaining; i++) {
    cells += `<div class="cal-day other-month"><span class="day-num">${i}</span></div>`;
  }
  return cells;
}

function selectDay(d) {
  selectedDate = new Date(focusedYear, focusedMonth, d);
  render();
}

function prevMonth() {
  focusedMonth--;
  if (focusedMonth < 0) { focusedMonth = 11; focusedYear--; }
  render();
}
function nextMonth() {
  focusedMonth++;
  if (focusedMonth > 11) { focusedMonth = 0; focusedYear++; }
  render();
}

function goToAllSchedule() {
  window.location.href = 'quanburicheng.html';
}

function render() {
  const dayEvents = getEventsForDate(selectedDate);
  const selLabel = `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`;
  const monthLabel = `${focusedYear} 年 ${focusedMonth + 1} 月`;

  let html = `
  <div class="schedule-hero-card">
    <div class="shc-header">
      <div class="shc-header-left">
        <span>您的日程</span>
        <button class="shc-add-btn" onclick="openEventModal()" title="记一笔">+</button>
      </div>
      <div class="shc-header-right">
        <span class="shc-user-tag">张小明 · 高三 ▾</span>
        <a href="javascript:void(0)" onclick="goToAllSchedule()" class="shc-all-btn">全部日程 <span class="material-icons">chevron_right</span></a>
      </div>
    </div>

    <div class="shc-main-event" onclick="goToAllSchedule()">
      <div>
        <div class="shc-main-title">期中综合考试 (已出报告)</div>
        <div class="shc-main-sub">2026-08-04 · 关联学生: 张小明</div>
      </div>
      <div class="shc-main-badge" style="background:#4CAF50">已完成</div>
    </div>

    <div class="shc-sub-list">
      <div class="shc-sub-item" onclick="goToAllSchedule()">
        <div class="shc-sub-left">
          <span>📌</span>
          <span>考前家长会 (多学生)</span>
        </div>
        <div class="shc-sub-right">
          <span class="shc-date">张小明, 刘小五</span>
          <span class="shc-days">5天后</span>
        </div>
      </div>
    </div>

    <div class="shc-tip">
      <span class="material-icons">tips_and_updates</span>
      <span>大考临近，建议多关注孩子作息与心态调节，避免过分强调分数。</span>
    </div>
  </div>

  <div class="card" id="calendarCard">
    <div class="cal-nav">
      <button onclick="prevMonth()"><span class="material-icons">chevron_left</span></button>
      <span class="month-label">${monthLabel}</span>
      <button onclick="nextMonth()"><span class="material-icons">chevron_right</span></button>
    </div>
    <div class="cal-grid">
      <div class="cal-header">一</div><div class="cal-header">二</div><div class="cal-header">三</div><div class="cal-header">四</div><div class="cal-header">五</div><div class="cal-header">六</div><div class="cal-header">日</div>
      ${renderCalendar()}
    </div>
  </div>

  <div class="card">
    <div class="section-title" style="display:flex;justify-content:space-between;align-items:center">
      <span>${selLabel} 日程 · 共 ${dayEvents.length} 件</span>
      <button onclick="openEventModal()" style="border:none;background:#FFF0EB;color:#E6431A;padding:4px 10px;border-radius:12px;font-size:12px;font-weight:600;cursor:pointer">+ 记一笔</button>
    </div>
    ${dayEvents.length === 0 ? '<div style="font-size:13px;color:var(--hint);text-align:center;padding:16px 0">当天暂无日程，点击右上角快速添加</div>' :
    dayEvents.map((ev, idx) => `
      <div class="event-item" onclick="openEventModal('${ev.id}')" style="cursor:pointer">
        <span class="material-icons" style="color:${typeColors[ev.type]||'var(--hint)'}">${ev.type==='mock_exam'?'assignment':ev.type==='gaokao'?'flag':ev.type==='physical_exam'?'local_hospital':'event'}</span>
        <div class="ev-content">
          <div class="ev-title">${ev.title} ${ev.hasReport ? '<span style="font-size:10px;background:#E8F5E9;color:#2E7D32;padding:2px 6px;border-radius:4px;margin-left:4px">含报告</span>' : ''}</div>
          <div class="ev-sub">${ev.date}${ev.subject ? ' · ' + ev.subject : ''} · ${(ev.students || ['张小明']).join(', ')}</div>
        </div>
        <span class="material-icons" style="font-size:18px;color:var(--hint)">edit</span>
      </div>`).join('')}
  </div>

  <div class="template-chips">
    ${templates.map(t => `<div class="template-chip" onclick="openEventModal('', '${t.name}', '${t.type}')"><span class="material-icons">${t.icon}</span>${t.name}</div>`).join('')}
  </div>
  `;
  document.getElementById('pageBody').innerHTML = html;
}

let activeEditEventId = null;

function openEventModal(eventId, tplTitle, tplType) {
  activeEditEventId = eventId || null;
  const isEdit = Boolean(eventId);
  let ev = null;
  if (isEdit) {
    ev = mockEvents.find(e => e.id === eventId);
  }

  const titleVal = ev ? ev.title : (tplTitle || '');
  const dateVal = ev ? ev.date : `${selectedDate.getFullYear()}-${String(selectedDate.getMonth()+1).padStart(2,'0')}-${String(selectedDate.getDate()).padStart(2,'0')}`;
  const subjectVal = ev ? (ev.subject || '') : '';
  const typeVal = ev ? ev.type : (tplType || 'custom');
  const selectedStudents = ev ? (ev.students || ['张小明']) : ['张小明'];

  const modal = document.createElement('div');
  modal.id = 'eventModal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:1000;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(3px)';
  
  modal.innerHTML = `
    <div style="background:#fff;border-radius:18px;padding:22px;width:90%;max-width:360px;box-shadow:0 12px 36px rgba(0,0,0,0.18)">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="font-size:17px;font-weight:700;color:#1A1A1A">${isEdit ? '编辑日程' : '新增备考日程'}</h3>
        <span class="material-icons" onclick="closeEventModal()" style="cursor:pointer;color:#999">close</span>
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">日程名称 *</label>
        <input id="evTitle" value="${titleVal}" style="width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:10px;font-size:14px;box-sizing:border-box" placeholder="如：期中综合考试 / 考前家长会">
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">日程日期 *</label>
        <input id="evDate" type="date" value="${dateVal}" style="width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:10px;font-size:14px;box-sizing:border-box">
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">关联学生 (可多选绑定)</label>
        <div style="display:flex;gap:8px;margin-top:4px" id="studentChipsWrap">
          <label style="display:flex;align-items:center;gap:4px;background:${selectedStudents.includes('张小明')?'#FFF0EB':'#F5F5F5'};color:${selectedStudents.includes('张小明')?'#E6431A':'#333'};padding:6px 12px;border-radius:20px;font-size:13px;cursor:pointer;border:1px solid ${selectedStudents.includes('张小明')?'#FFCCBC':'#E0E0E0'}">
            <input type="checkbox" value="张小明" ${selectedStudents.includes('张小明')?'checked':''} onchange="toggleChipStyle(this)" style="display:none">
            <span>张小明 (高三)</span>
          </label>
          <label style="display:flex;align-items:center;gap:4px;background:${selectedStudents.includes('刘小五')?'#FFF0EB':'#F5F5F5'};color:${selectedStudents.includes('刘小五')?'#E6431A':'#333'};padding:6px 12px;border-radius:20px;font-size:13px;cursor:pointer;border:1px solid ${selectedStudents.includes('刘小五')?'#FFCCBC':'#E0E0E0'}">
            <input type="checkbox" value="刘小五" ${selectedStudents.includes('刘小五')?'checked':''} onchange="toggleChipStyle(this)" style="display:none">
            <span>刘小五 (高一)</span>
          </label>
        </div>
      </div>

      <div style="margin-bottom:16px">
        <label style="display:block;font-size:12px;font-weight:600;color:#666;margin-bottom:4px">日程性质</label>
        <select id="evType" style="width:100%;padding:10px 12px;border:1px solid #ddd;border-radius:10px;font-size:14px;box-sizing:border-box">
          <option value="mock_exam" ${typeVal==='mock_exam'?'selected':''}>模拟考试 (关联复盘报告)</option>
          <option value="custom" ${typeVal==='custom'?'selected':''}>日常备考 / 家长会</option>
          <option value="registration" ${typeVal==='registration'?'selected':''}>报名 / 选科填报</option>
          <option value="volunteer" ${typeVal==='volunteer'?'selected':''}>志愿填报</option>
        </select>
      </div>

      <div style="display:flex;gap:10px;justify-content:space-between;align-items:center;margin-top:20px">
        <div>
          ${isEdit ? `<button onclick="confirmDeleteEvent('${eventId}')" style="padding:9px 14px;border-radius:10px;border:1px solid #FFCDD2;background:#FFEBEE;font-size:13px;color:#D32F2F;cursor:pointer;font-weight:600">删除</button>` : ''}
        </div>
        <div style="display:flex;gap:10px">
          <button onclick="closeEventModal()" style="padding:9px 16px;border-radius:10px;border:1px solid #ddd;background:#fff;font-size:14px;color:#666;cursor:pointer">取消</button>
          <button onclick="saveEvent()" style="padding:9px 18px;border-radius:10px;border:none;background:#E6431A;color:#fff;font-size:14px;font-weight:600;cursor:pointer">保存</button>
        </div>
      </div>
    </div>
  `;

  modal.addEventListener('click', function(e) { if (e.target === modal) closeEventModal(); });
  document.body.appendChild(modal);
}

window.toggleChipStyle = function(input) {
  const label = input.parentElement;
  if (input.checked) {
    label.style.background = '#FFF0EB';
    label.style.color = '#E6431A';
    label.style.borderColor = '#FFCCBC';
  } else {
    label.style.background = '#F5F5F5';
    label.style.color = '#333';
    label.style.borderColor = '#E0E0E0';
  }
};

function closeEventModal() {
  const m = document.getElementById('eventModal');
  if (m) m.remove();
}

function saveEvent() {
  const title = document.getElementById('evTitle').value.trim();
  const date = document.getElementById('evDate').value.trim();
  const type = document.getElementById('evType').value;
  const checkedBoxes = Array.from(document.querySelectorAll('#studentChipsWrap input[type="checkbox"]:checked'));
  const students = checkedBoxes.map(b => b.value);

  if (!title) { alert('请输入日程名称'); return; }
  if (!date) { alert('请选择日程日期'); return; }
  if (students.length === 0) students.push('张小明');

  if (activeEditEventId) {
    const item = mockEvents.find(e => e.id === activeEditEventId);
    if (item) {
      item.title = title;
      item.date = date;
      item.type = type;
      item.students = students;
    }
  } else {
    mockEvents.push({
      id: 'ev-' + Date.now(),
      title,
      date,
      type,
      subject: type === 'mock_exam' ? '全科' : '',
      students,
      hasReport: false
    });
  }

  saveEventsToStorage();
  closeEventModal();
  render();
}

function confirmDeleteEvent(eventId) {
  const ev = mockEvents.find(e => e.id === eventId);
  if (!ev) return;

  const isExam = ev.type === 'mock_exam' || ev.title.includes('考') || ev.hasReport;
  
  if (isExam) {
    // 考试日程强二次确认
    const confirmModal = document.createElement('div');
    confirmModal.id = 'deleteConfirmModal';
    confirmModal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:1100;display:flex;align-items:center;justify-content:center';
    confirmModal.innerHTML = `
      <div style="background:#fff;border-radius:16px;padding:24px;width:86%;max-width:320px;text-align:center;box-shadow:0 12px 32px rgba(0,0,0,0.25)">
        <div style="width:48px;height:48px;border-radius:50%;background:#FEECEB;color:#E6431A;display:flex;align-items:center;justify-content:center;margin:0 auto 14px">
          <span class="material-icons" style="font-size:28px">warning</span>
        </div>
        <div style="font-size:16px;font-weight:700;color:#1A1A1A;margin-bottom:8px">确定删除此考试日程吗？</div>
        <div style="font-size:13px;color:#666;line-height:1.5;margin-bottom:20px">
          「<strong>${ev.title}</strong>」关联重要考试诊断与提分计划，删除后相关考前提醒将失效！
        </div>
        <div style="display:flex;gap:10px">
          <button onclick="document.getElementById('deleteConfirmModal').remove()" style="flex:1;padding:10px;border-radius:10px;border:1px solid #ddd;background:#fff;font-size:14px;color:#666;font-weight:500;cursor:pointer">取消</button>
          <button onclick="executeDeleteEvent('${eventId}')" style="flex:1;padding:10px;border-radius:10px;border:none;background:#D32F2F;color:#fff;font-size:14px;font-weight:600;cursor:pointer">确认删除</button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmModal);
  } else {
    executeDeleteEvent(eventId);
  }
}

function executeDeleteEvent(eventId) {
  const conf = document.getElementById('deleteConfirmModal');
  if (conf) conf.remove();
  mockEvents = mockEvents.filter(e => e.id !== eventId);
  saveEventsToStorage();
  closeEventModal();
  render();
}

window.openEventModal = openEventModal;
window.confirmDeleteEvent = confirmDeleteEvent;
window.executeDeleteEvent = executeDeleteEvent;
window.saveEvent = saveEvent;
window.closeEventModal = closeEventModal;
window.selectDay = selectDay;
window.prevMonth = prevMonth;
window.nextMonth = nextMonth;
window.goToAllSchedule = goToAllSchedule;

render();
