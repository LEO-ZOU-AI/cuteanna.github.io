document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    const boy = document.getElementById('boy');
    const stick = document.getElementById('stick');
    const firstPersonView = document.getElementById('first-person-view');
    const backButton = document.getElementById('back-button');
    const fireworksContainer = document.getElementById('fireworks-container');
    const fireworksView = document.querySelector('.fireworks-view');
    const loveMessage = document.getElementById('love-message');
    const stickBranches = document.querySelector('.stick-branches');
    const backgroundMusic = document.getElementById('background-music');
    const musicControl = document.getElementById('music-control');
    const message = document.getElementById('message');
    const poetryText = document.getElementById('poetry-text');
    
    // 创建烟花光影形成的"叶子"效果
    function createLeafShadows() {
        const positions = [
            { top: '15px', left: '-25px', transform: 'rotate(-35deg)' },
            { top: '40px', left: '-20px', transform: 'rotate(-25deg)' },
            { top: '65px', left: '-15px', transform: 'rotate(-15deg)' },
            { top: '90px', left: '-10px', transform: 'rotate(-5deg)' },
            { top: '15px', right: '-25px', transform: 'rotate(35deg)' },
            { top: '40px', right: '-20px', transform: 'rotate(25deg)' },
            { top: '65px', right: '-15px', transform: 'rotate(15deg)' },
            { top: '90px', right: '-10px', transform: 'rotate(5deg)' },
            { top: '5px', left: '2px', transform: 'rotate(-2deg)' },
            { top: '25px', left: '1px', transform: 'rotate(2deg)' }
        ];
        
        positions.forEach(pos => {
            const leafShadow = document.createElement('div');
            leafShadow.className = 'leaf-shadow';
            
            for (const [prop, value] of Object.entries(pos)) {
                leafShadow.style[prop] = value;
            }
            
            stickBranches.appendChild(leafShadow);
        });
    }
    
    createLeafShadows();
    
    // 生成随机数
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // 创建上升的烟花
    function createRisingFirework(x, color, container) {
        const rocket = document.createElement('div');
        rocket.className = 'firework-rocket';
        rocket.style.left = `${x}%`;
        rocket.style.bottom = '50vh'; // 从海面开始
        rocket.style.backgroundColor = color;
        container.appendChild(rocket);
        
        // 上升动画
        rocket.style.animation = 'riseUp 2s ease-out forwards';
        
        // 到达顶点后爆炸
        setTimeout(() => {
            const explodeY = parseInt(rocket.style.top) || 20;
            createExplosion(x, explodeY, color, container);
            rocket.remove();
        }, 2000);
    }
    
    // 创建爆炸效果
    function createExplosion(x, y, color, container) {
        const explosion = document.createElement('div');
        explosion.className = 'firework-explosion';
        explosion.style.left = `${x}%`;
        explosion.style.top = `${y}%`;
        container.appendChild(explosion);
        
        // 创建粒子
        const particleCount = 30;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundColor = color;
            
            // 随机方向
            const angle = (i / particleCount) * Math.PI * 2;
            const distance = random(50, 100);
            const px = Math.cos(angle) * distance;
            const py = Math.sin(angle) * distance;
            
            particle.style.setProperty('--x', `${px}px`);
            particle.style.setProperty('--y', `${py}px`);
            
            explosion.appendChild(particle);
        }
        
        // 移除爆炸
        setTimeout(() => {
            explosion.remove();
        }, 2000);
    }
    
    // 创建烟花（兼容旧版本）
    function createFirework(x, y, color, container) {
        createExplosion(x, y, color, container);
    }
    
    // 生成烟花
    function generateFireworks() {
        const colors = [
            '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
            '#ff00ff', '#00ffff', '#ff9900', '#9900ff'
        ];
        
        // 主要烟花 - 从海面升起
        setInterval(() => {
            const x = random(30, 70);
            const color = colors[Math.floor(random(0, colors.length))];
            createRisingFirework(x, color, fireworksContainer);
        }, 1500);
        
        // 背景烟花 - 从海面升起
        setInterval(() => {
            const x = random(10, 90);
            const color = colors[Math.floor(random(0, colors.length))];
            createRisingFirework(x, color, fireworksContainer);
        }, 2500);
        
        // 第一人称视角烟花
        setInterval(() => {
            if (firstPersonView.style.display === 'block') {
                const x = random(20, 80);
                const y = random(5, 40);
                const color = colors[Math.floor(random(0, colors.length))];
                createFirework(x, y, color, fireworksView);
                
                // 照亮树枝
                stickBranches.classList.add('illuminated');
                
                // 显示爱的信息
                setTimeout(() => {
                    loveMessage.classList.remove('hidden');
                }, 1500);
            }
        }, 800);
    }
    
    // 初始化烟花
    generateFireworks();
    
    // 点击男生切换到第一人称视角
    boy.addEventListener('click', function() {
        firstPersonView.style.display = 'block';
        stickBranches.classList.remove('illuminated');
        loveMessage.classList.add('hidden');
        
        // 重新生成第一人称视角的烟花
        const fireworks = fireworksView.querySelectorAll('.firework');
        fireworks.forEach(firework => firework.remove());

        // 添加枯枝照亮效果
        setTimeout(() => {
            document.querySelector('.stick-branches').classList.add('illuminated');
            // 显示诗句文字动画
            setTimeout(() => {
                poetryText.classList.add('show');
            }, 1000);
        }, 1500);
        
        // 显示爱意信息
        setTimeout(() => {
            loveMessage.classList.remove('hidden');
        }, 3000);
    });
    
    // 返回按钮
    backButton.addEventListener('click', function() {
        firstPersonView.style.display = 'none';
        stickBranches.classList.remove('illuminated');
        loveMessage.classList.add('hidden');
        poetryText.classList.remove('show');
    });
    
    // 海浪动画
    const sea = document.querySelector('.sea');
    let wavePosition = 0;
    
    function animateWaves() {
        wavePosition -= 1;
        sea.style.backgroundPosition = `${wavePosition}px 0`;
        requestAnimationFrame(animateWaves);
    }
    
    animateWaves();
    
    // 初始动画：男生举起树枝
    setTimeout(() => {
        // 先让男生举起手臂
        boy.querySelector('.right-arm').style.animation = 'raiseArm 1.5s forwards';
        // 然后让树枝跟随移动
        setTimeout(() => {
            stick.style.animation = 'raiseStick 1s forwards';
        }, 500);
    }, 1000);
    
    // 音乐控制
    let isPlaying = false;
    musicControl.addEventListener('click', () => {
        if (isPlaying) {
            backgroundMusic.pause();
            musicControl.classList.remove('playing');
            isPlaying = false;
        } else {
            backgroundMusic.play().catch(e => console.log('音乐播放失败:', e));
            musicControl.classList.add('playing');
            isPlaying = true;
        }
    });
    
    // 当用户与页面交互时自动播放音乐
    document.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play();
            musicControl.classList.add('playing');
        }
    }, { once: true });
}); 
