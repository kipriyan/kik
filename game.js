// Creating variables
var myX = [], myY = [], health = [];
var X = 15, Y = 15;
var s = 20, cs = 30;
var grid = [], dist = [];
var colors = ["green", "cyan"];
var t=0, hasToMove=0,X=15,Y=15;
var bulletX = [], bulletY = [],lX=900,lY=700, coints = 3,heroX=2*cs,heroY=2*cs,kX=0,kY=0,q=0,j=0,p=0;
 luk=new Image();
 luk.src="hero.bmp";
 kuk=new Image();
 kuk.src="vrag.bmp";
for (let i=0; i<s; ++i){
    grid[i] = [];
    dist[i] = [];
    for (let j=0; j<s; ++j){
        grid[i][j] = 0;
    }
}
calcDist();
function calcDist(){
    for (let i=0; i<s; ++i){
        for (let j=0; j<s; ++j){
            dist[i][j] = 0;
        }
    }
    dist[X][Y] = 2;
    for (let d=2;; ++d){
        let flag = 0;
        for (let i=0; i<s; ++i){
            for (let j=0; j<s; ++j){
                if (dist[i][j] == d){
                    if (i>0 && dist[i-1][j]==0 && grid[i-1][j]==0){dist[i-1][j]=d+1; flag=1;}
                    if (i<s-1 && dist[i+1][j]==0 && grid[i+1][j]==0){dist[i+1][j]=d+1; flag=1;}
                    if (j>0 && dist[i][j-1]==0 && grid[i][j-1]==0){dist[i][j-1]=d+1; flag=1;}
                    if (j<s-1 && dist[i][j+1]==0 && grid[i][j+1]==0){dist[i][j+1]=d+1; flag=1;}
                }
            }
        }
        if (!flag){break;}
    }
}
 
function dist2(x1, y1, x2, y2){
    return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}
 
function shoot(x, y){
    bulletX.push(x);
    bulletY.push(y);
}
 
function del(ind){
    myX[ind] = myX[myX.length-1];
    myY[ind] = myY[myY.length-1];
    health[ind] = health[health.length-1];
    myX.pop();
    myY.pop();
    health.pop();
}
 
function delBul(ind){
    bulletX[ind] = bulletX[bulletX.length-1];
    bulletY[ind] = bulletY[bulletY.length-1];
    bulletX.pop();
    bulletY.pop();
}
 
function update() {
   
   // if(areColliding(X,Y,30,30, myX[ind]*cs, myY[ind]*cs, 30, 30)){
    //  console.log("lol");
  //  }
  //  for(var i=0;i<X;i=i+1){
         //for( i=0;i<myY;i=i+1){
  //  if(areColliding(X,Y,130,130, myX[i], myY[i], 30, 30)){
  //console.log(X,Y);
 //} 
   // }
    for(var i=0;i<X;i=i+1){
    if(myX[i]==15 && myY[i]==15){
     //   console.log("lol");
        lX=0;
      lY=0;
        q=0;
    }
    }
   // }
  //  if (areColliding(bulletX[b], bulletY[b], 10, 10, myX[ind]*cs, myY[ind]*cs, 30, 30)){
   //      console.log("lol");
   // }
    if (t%400==0){
        myX.push(0);
        myY.push(0);
        health.push(75);
      
       
    }
    if (t%50==0){
        for (let i=0; i<s; ++i){
            for (let j=0; j<s; ++j){
                if (grid[i][j] == 1){
                    let inRange = false;
                    for (let a=0; a<myX.length; ++a){
                        if (dist2(myX[a]*cs, myY[a]*cs, i*cs, j*cs) < 600){
                            inRange = true;
                            break;
                        }
                    }
                    if (inRange){shoot(i*cs, j*cs);}
                }
            }
        }
    }
    if (t%100==0){
        for (let i=0; i<myX.length; ++i){
            if(dist[myX[i]][myY[i]]==0){
                --health[i];
                ++coints;
             }else{
                if (myX[i]>0 && dist[myX[i]-1][myY[i]] == dist[myX[i]][myY[i]]-1){--myX[i];}
                else if (myX[i]<s-1 && dist[myX[i]+1][myY[i]] == dist[myX[i]][myY[i]]-1){++myX[i];}
                else if (myY[i]>1 && dist[myX[i]][myY[i]-1] == dist[myX[i]][myY[i]]-1){--myY[i];}
                else if (myY[i]<s-1 && dist[myX[i]][myY[i]+1] == dist[myX[i]][myY[i]]-1){++myY[i];}
            }
        }
    }
    for (var b=0; b<bulletX.length; ++b){
        var bestdist = 1000, ind=0;
        for (let e=0; e<myX.length; ++e){
            let cdist = dist2(bulletX[b], bulletY[b], myX[e]*cs, myY[e]*cs);
            if (cdist < bestdist){
                bestdist = cdist;
                ind = e;
            }
        }
        bulletX[b] += (myX[ind]*cs-bulletX[b])*10/bestdist;
        bulletY[b] += (myY[ind]*cs-bulletY[b])*10/bestdist;
        if (areColliding(bulletX[b], bulletY[b], 10, 10, myX[ind]*cs, myY[ind]*cs, 30, 30)){
            delBul(b);--b;
            --health[ind];
            if (health[ind]<=0){
                del(ind);
                coints=coints+1;
              ++q;
            }
        }
    }
    ++t;
    if(coints>=3 && t>=950){
        coints=2;
    }
   
    if (isKeyPressed[32]){
           myX[i]="NaN";
            myY[i]="NaN";
           console.log("lol");
     }
  
}
 
function draw() {
    context.fillStyle = "green";
context.fillRect(kX,kY,600,600);
    for (let i=0; i<s; ++i){
        for (let j=0; j<s; ++j){
            context.fillStyle = colors[grid[i][j]];
            context.fillRect(i*cs, j*cs, cs-1, cs-1);
        }
    }
    for (let i=0; i<myX.length; ++i){
       
        context.drawImage(kuk,myX[i]*cs, myY[i]*cs, cs-1, cs-1);
    }
    context.fillStyle = "blue";
    context.fillRect(X*cs, Y*cs, cs-1, cs-1);
    context.fillStyle = "black";
    for (let i=0; i<bulletX.length; ++i){
        context.fillRect(bulletX[i], bulletY[i], 10, 10);
    }
    context.drawImage(luk,heroX,heroY,cs-1,cs-1);
       context.fillStyle = "red";
     context.fillRect(lX,lY,800,600);
     context.fillStyle = "blue";
      context.font="50px Times New Roman"
        context.fillText(coints,50,50);
    context.font="50px Times New Roman"
        context.fillText(q,500,500);
        if(q>=100){
   context.fillRect(j,j,800,600);
    }
};
 
function keyup(key) {
    if(key==68){
      heroX=heroX+30;  
    }
     if(key==65){
       heroX=heroX-30;  
    }
     if(key==83){
      heroY=heroY+30;  
    }
     if(key==87){
      heroY=heroY-30;  
    }
     //console.log("Pressed", key);
    
};
 
function mouseup() {
    
  
    if(coints>=1){
       coints=coints-1;
    let i = Math.floor(mouseX/cs);
    let j = Math.floor(mouseY/cs);
    if (i==0 && j==0){return;}
    for (let a=0; a<myX.length; ++a){
   //     if (i == myX[a] && j == myY[a]){return;}
    }
  grid[i][j] = 1 - grid[i][j];
    calcDist();
      
 }
};
