(function(){
// Typing animation in the hero
var words=["CSE Student","DSA Learner","AI Project Builder","Future Engineer"],wi=0,ci=0,del=false,t=document.getElementById("type");
function tick(){var w=words[wi];ci+=del?-1:1;t.textContent=w.slice(0,ci);var d=del?40:90;
if(!del&&ci===w.length){del=true;d=1200}else if(del&&ci===0){del=false;wi=(wi+1)%words.length;d=300}setTimeout(tick,d)}
tick();

// Scroll reveal and skill bar fill
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("on");e.target.querySelectorAll(".bar i").forEach(function(b){b.style.width=b.dataset.w+"%"})}})},{threshold:.12});
document.querySelectorAll(".rv").forEach(function(el){io.observe(el)});

// Background network animation
var c=document.getElementById("net"),x=c.getContext("2d"),P=[],W,H;
function rs(){W=c.width=innerWidth;H=c.height=innerHeight}rs();addEventListener("resize",rs);
for(var i=0;i<45;i++)P.push({x:Math.random()*2000,y:Math.random()*1200,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4});
function col(){return getComputedStyle(document.documentElement).getPropertyValue("--a").trim()||"#5b4bff"}
function loop(){x.clearRect(0,0,W,H);var k=col(),st=getComputedStyle(document.documentElement),cl=["--a","--c","--d","--b"].map(function(n){return st.getPropertyValue(n).trim()});x.strokeStyle=k;
P.forEach(function(p,i){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;x.fillStyle=cl[i%4];x.globalAlpha=.8;x.beginPath();x.arc(p.x,p.y,2,0,6.3);x.fill();
for(var j=i+1;j<P.length;j++){var q=P[j],d=Math.hypot(p.x-q.x,p.y-q.y);if(d<130){x.globalAlpha=(1-d/130)*.35;x.beginPath();x.moveTo(p.x,p.y);x.lineTo(q.x,q.y);x.stroke()}}});
requestAnimationFrame(loop)}loop();

// EagleEye AI heatmap demo
var h=document.getElementById("heat"),g=h.getContext("2d"),N=20,S=h.width/N,pr=[],A=[];
for(var r=0;r<N;r++){pr[r]=[];for(var q=0;q<N;q++){var d1=Math.hypot(r-6,q-13),d2=Math.hypot(r-14,q-5);pr[r][q]=Math.min(1,Math.exp(-d1*d1/14)+.8*Math.exp(-d2*d2/18)+Math.random()*.12)}}
for(var a=0;a<4;a++)A.push({r:Math.floor(Math.random()*N),c:Math.floor(Math.random()*N)});
function color(v,s){if(s)return"rgba(40,40,60,.9)";var hue=240-v*240;return"hsl("+hue+",85%,"+(48+(1-v)*4)+"%)"}
var done=[];for(r=0;r<N;r++){done[r]=[];for(q=0;q<N;q++)done[r][q]=false}
function draw(){for(var r=0;r<N;r++)for(var q=0;q<N;q++){g.fillStyle=color(pr[r][q],done[r][q]);g.fillRect(q*S,r*S,S-1,S-1)}
A.forEach(function(a){g.fillStyle="#fff";g.beginPath();g.arc(a.c*S+S/2,a.r*S+S/2,S/2.4,0,6.3);g.fill();g.strokeStyle="#000";g.stroke()})}
function step(){A.forEach(function(a){done[a.r][a.c]=true;pr[a.r][a.c]*=.3;var best=null,bv=-1;
[[-1,0],[1,0],[0,-1],[0,1],[-1,-1],[1,1],[-1,1],[1,-1]].forEach(function(m){var rr=a.r+m[0],cc=a.c+m[1];if(rr<0||cc<0||rr>=N||cc>=N)return;var v=(done[rr][cc]?0:pr[rr][cc]+.25)+Math.random()*.25;if(v>bv){bv=v;best={r:rr,c:cc}}});if(best){a.r=best.r;a.c=best.c}});
var left=0;for(var r=0;r<N;r++)for(var q=0;q<N;q++)if(!done[r][q])left++;
if(left<N*N*.3){for(r=0;r<N;r++)for(q=0;q<N;q++){done[r][q]=false;pr[r][q]=Math.random()*.15}
var cx=Math.floor(Math.random()*N),cy=Math.floor(Math.random()*N);for(r=0;r<N;r++)for(q=0;q<N;q++){var d=Math.hypot(r-cx,q-cy);pr[r][q]=Math.min(1,pr[r][q]+Math.exp(-d*d/16))}}
draw()}
draw();setInterval(step,180);
})();
