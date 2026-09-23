const avatarColors=['#E6431A','#1565C0','#43A047','#9C27B0','#FF6D00','#00838F'];
const allSubjects=['语文','数学','英语','物理','化学','生物','政治','历史','地理'];
const grades=['高一','高二','高三'];
const tracks=['理科','文科','综合'];

let students=[
{id:1,name:'张小明',grade:'高三',track:'理科',subjects:['数学','语文','英语','物理','化学','生物'],school:'市第一中学'}
];
let editingId=null;

function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';setTimeout(()=>t.style.display='none',2000)}

function render(){
if(students.length===0){
document.getElementById('pageBody').innerHTML=`
<div class="empty-state"><span class="material-icons">face</span><p>还没有添加孩子信息</p></div>
<div class="add-card" onclick="openAddModal()"><span class="material-icons">add</span>添加孩子</div>`;
return;
}
let html=students.map((s,i)=>`
<div class="card student-card">
<div class="avatar" style="background:${avatarColors[i%avatarColors.length]}">${s.name[0]}</div>
<div class="info">
<div class="name">${s.name}</div>
<div class="detail">${s.grade} · ${s.track}${s.school?' · '+s.school:''}</div>
<div class="subjects">科目：${s.subjects.join('、')}</div>
</div>
<div class="actions-row">
<button onclick="openEditModal(${s.id})"><span class="material-icons" style="font-size:20px">edit</span></button>
<button class="delete" onclick="deleteStudent(${s.id})"><span class="material-icons" style="font-size:20px">delete_outline</span></button>
</div>
</div>`).join('');
html+=`<div class="add-card" onclick="openAddModal()"><span class="material-icons">add</span>添加孩子</div>`;
document.getElementById('pageBody').innerHTML=html;
}

function getModalHtml(student){
const s=student||{name:'',grade:'高三',track:'理科',subjects:[],school:''};
const isEdit=!!student;
return `
<h3>${isEdit?'编辑孩子信息':'添加孩子'}</h3>
<div class="form-group"><label>姓名</label><input class="form-field" id="fName" value="${s.name}" placeholder="孩子姓名"></div>
<div class="form-group"><label>年级</label><select class="form-field" id="fGrade">${grades.map(g=>`<option${g===s.grade?' selected':''}>${g}</option>`).join('')}</select></div>
<div class="form-group"><label>文/理科</label><select class="form-field" id="fTrack">${tracks.map(t=>`<option${t===s.track?' selected':''}>${t}</option>`).join('')}</select></div>
<div class="form-group"><label>学校（可选）</label><input class="form-field" id="fSchool" value="${s.school||''}" placeholder="如：市第一中学"></div>
<div class="form-group"><label>学习科目</label>
<div class="chip-select" id="fSubjects">${allSubjects.map(sub=>`<span class="chip${s.subjects.includes(sub)?' active':''}" onclick="toggleSubject(this,'${sub}')">${sub}</span>`).join('')}</div></div>
<div class="modal-actions">
<button class="cancel" onclick="closeModal()">取消</button>
<button class="confirm" onclick="saveStudent()">${isEdit?'保存':'添加'}</button>
</div>`;
}

function openAddModal(){
editingId=null;
document.getElementById('modalBox').innerHTML=getModalHtml(null);
document.getElementById('modalOverlay').style.display='flex';
}

function openEditModal(id){
const s=students.find(x=>x.id===id);
if(!s)return;
editingId=id;
document.getElementById('modalBox').innerHTML=getModalHtml(s);
document.getElementById('modalOverlay').style.display='flex';
}

function closeModal(){document.getElementById('modalOverlay').style.display='none';editingId=null}

function toggleSubject(el,sub){el.classList.toggle('active')}

function getSelectedSubjects(){
const chips=document.querySelectorAll('#fSubjects .chip.active');
return Array.from(chips).map(c=>c.textContent);
}

function saveStudent(){
const name=document.getElementById('fName').value.trim();
const grade=document.getElementById('fGrade').value;
const track=document.getElementById('fTrack').value;
const school=document.getElementById('fSchool').value.trim();
const subjects=getSelectedSubjects();
if(!name){showToast('请输入孩子姓名');return}
if(subjects.length===0){showToast('请至少选择一个科目');return}

if(editingId){
const s=students.find(x=>x.id===editingId);
if(s){s.name=name;s.grade=grade;s.track=track;s.school=school;s.subjects=subjects}
showToast('已保存修改');
}else{
const newId=students.length>0?Math.max(...students.map(s=>s.id))+1:1;
students.push({id:newId,name,grade,track,school,subjects});
showToast('添加成功');
}
closeModal();
render();
}

function deleteStudent(id){
const s=students.find(x=>x.id===id);
if(!s)return;
if(!confirm(`确定删除「${s.name}」的信息吗？`))return;
students=students.filter(x=>x.id!==id);
showToast('已删除');
render();
}

render();