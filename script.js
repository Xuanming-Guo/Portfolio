
let bubblesActive = false;
let bubbleTimers = [];

document.addEventListener('DOMContentLoaded', function() {

    /* -------------------------------
       Element Selections
    ------------------------------- */
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('back-to-top');
    const modeToggleBtn = document.getElementById('mode-toggle');
    const findMoreButtons = document.querySelectorAll('.find-more-btn');
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-content');
    const closeBtn = modal.querySelector('.close-btn');
    const backgroundIndicator = document.getElementById('background-indicator');
    const spotlightOverlay = document.getElementById('spotlight-overlay');
    const dynamicBackground = document.getElementById('dynamic-background');
  
    /* -------------------------------
       Global Variables
    ------------------------------- */
    let currentEffectIndex = 0;
    let currentEffectName = "Gradient Background";
    let shapesTimer = null;
  
    /* -------------------------------
       Intersection Observer for Section Fade & Nav Highlight
    ------------------------------- */
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        } else {
          entry.target.classList.remove('visible');
        }
      });
    }, observerOptions);
    sections.forEach(section => sectionObserver.observe(section));

    
  
    /* -------------------------------
       Back to Top Button
    ------------------------------- */
    window.addEventListener('scroll', function() {
      backToTopBtn.style.display = (window.scrollY > 200) ? 'block' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    /* -------------------------------
       Light/Dark Mode Toggle
       When toggling mode, if current effect is Bubbles or Shapes, update their colours without clearing.
    ------------------------------- */
    modeToggleBtn.addEventListener('click', function() {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        
        if(currentEffectName === "Gradient Background") {
            backgroundEffects[currentEffectIndex].init();
          }
        document.querySelectorAll('.bubble').forEach(bubble => {
          const currentHue = bubble.style.getPropertyValue('--hue');
          bubble.style.background = `hsla(${currentHue}, 70%, ${isDarkMode ? 60 : 50}%, 0.8)`;
          bubble.style.filter = isDarkMode ? 
            `drop-shadow(0 0 20px hsla(${currentHue}, 90%, 70%, 0.7))` : 
            'none';
        });
      
        if(currentEffectName === "Mouse-Tracking Spotlight") {
            dynamicBackground.style.backgroundColor = isDarkMode ? '#121212' : '#f8f9fa';
          }
        document.querySelectorAll('.shape').forEach(shape => {
          const currentHue = shape.style.getPropertyValue('--hue');
          const color = `hsla(${currentHue}, 70%, ${isDarkMode ? 60 : 50}%, 0.8)`;
          
          if(shape.classList.contains('triangle')) {
            shape.style.borderBottomColor = color;
          } else {
            shape.style.background = color;
          }
          shape.style.filter = isDarkMode ? 
            `drop-shadow(0 0 25px hsla(${currentHue}, 90%, 70%, 0.7))` : 
            'none';
        });
      });
  
    /* -------------------------------
       Project Modal Functionality
    ------------------------------- */
    findMoreButtons.forEach(button => {
      button.addEventListener('click', function() {
        const projectId = button.getAttribute('data-project');
        const modalBody = modalContent.querySelector('.modal-body');
        if (projectId === '1') {
          modalBody.innerHTML = `
            <h3>Project Title 1</h3>
            <p>Detailed information about Project 1. Replace with your content.</p>
            <img src="project1-detail.jpg" alt="Project 1 Detail">
          `;
        } else if (projectId === '2') {
          modalBody.innerHTML = `
            <h3>Project Title 2</h3>
            <p>Detailed information about Project 2. Replace with your content.</p>
            <img src="project2-detail.jpg" alt="Project 2 Detail">
          `;
        } else {
          modalBody.innerHTML = `
            <h3>Project Title</h3>
            <p>Detailed information about the project. Replace with your content.</p>
          `;
        }
        modal.style.display = 'flex';
      document.body.classList.add('modal-open');
        modeToggleBtn.style.display = 'none';
      });
    });
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.classList.remove('modal-open');
      modeToggleBtn.style.display = 'block';
    });
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
        document.body.classList.remove('modal-open');
        modeToggleBtn.style.display = 'block';
      }
    });

    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
          const tabId = this.dataset.tab;
          
          document.querySelectorAll('.tab-btn, .tab-content').forEach(el => {
            el.classList.remove('active');
          });
          
          this.classList.add('active');
          document.getElementById(tabId).classList.add('active');
        });
      });
      
      document.querySelector('.tab-btn').click();
  
    /* -------------------------------
       Animate Skills Progress Bars
    ------------------------------- */
    const skillsSection = document.getElementById('skills');
    const progressBars = document.querySelectorAll('.progress');
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            let width = bar.style.width;
            bar.style.width = width;
          });
        }
      });
    }, { threshold: 0.5 });
    skillsObserver.observe(skillsSection);
  
    /* -------------------------------
       Spotlight Handlers
    ------------------------------- */
    function spotlightMouseMove(e) {
      const x = e.clientX, y = e.clientY;
      spotlightOverlay.style.background = `radial-gradient(circle at ${x}px ${y}px, white 125px, transparent 250px)`;
    }
    function enableSpotlight() {
      spotlightOverlay.style.display = 'block';
      document.addEventListener('mousemove', spotlightMouseMove);
    }
    function disableSpotlight() {
      spotlightOverlay.style.display = 'none';
      document.removeEventListener('mousemove', spotlightMouseMove);
    }
    document.addEventListener('mouseenter', () => {
      if (currentEffectName === "Mouse-Tracking Spotlight") {
        spotlightOverlay.style.display = 'block';
      }
    });
    document.addEventListener('mouseleave', () => {
      spotlightOverlay.style.display = 'none';
    });
  
    /* -------------------------------
       Background Effects & Toggle Button
    ------------------------------- */
    
    const backgroundEffects = [
      {
        name: "Gradient Background",
        init: function() {
      const lightPalettes = [
        'linear-gradient(45deg,rgb(239, 150, 150), #4ecdc4,rgb(139, 148, 207))',
        'linear-gradient(45deg,rgb(221, 142, 145),rgb(247, 218, 210),rgb(191, 159, 135))',
        'linear-gradient(45deg, #84fab0, #8fd3f4, #84fab0)'
      ];
      
      const darkPalettes = [
        'linear-gradient(45deg,rgb(46, 46, 99),rgba(27, 151, 223, 0.72), #2A2A72)',
        'linear-gradient(45deg,rgb(121, 44, 189),rgba(75, 0, 224, 0.67),rgb(81, 33, 123))', 
      ];

      const isDark = document.body.classList.contains('dark-mode');
      const palettes = isDark ? darkPalettes : lightPalettes;
      const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
      
      dynamicBackground.style.background = randomPalette;
      dynamicBackground.style.backgroundSize = '400% 400%';
      dynamicBackground.style.animation = 'gradientShift 10s ease infinite';
      dynamicBackground.style.transition = 'background 0.8s ease';
        }
      },
      {
        name: "Mouse-Tracking Spotlight",
        init: function() {
            const bgColor = document.body.classList.contains('dark-mode') 
              ? '#121212' 
              : '#f8f9fa';
            
            dynamicBackground.style.background = bgColor;
            dynamicBackground.style.animation = "";
            enableSpotlight();
            
            dynamicBackground.style.transition = 'background-color 0.5s ease';
          }
      },
      {
        name: "Floating Bubbles",
        init: function() {
            bubblesActive = true;
          function createBubble(delay = 0) {
            if (!bubblesActive) return;
            setTimeout(() => {
              if (!bubblesActive) return;
              const bubble = document.createElement('div');
              bubble.classList.add('bubble');
              const size = Math.floor(Math.random() * 60) + 20;
              bubble.style.width = `${size}px`;
              bubble.style.height = `${size}px`;
              bubble.style.left = `${Math.random() * 100}%`;
              bubble.style.transform = `translateX(-50%)`;
              bubble.style.top = `${90 + Math.random() * 10}%`;
              bubble.style.animationDuration = `${Math.random() * 7 + 8}s`;
              bubble.style.background = document.body.classList.contains('dark-mode') 
                ? 'rgba(25,25,112,0.8)' 
                : 'rgba(100,149,237,0.8)';
              bubble.style.setProperty('--x-offset', `${Math.random() * 100 - 50}px`);
              bubble.addEventListener('click', function(e) {
                const rect = bubble.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const clickY = e.clientY - rect.top;

                bubble.style.position = 'fixed';
                bubble.style.left = `${rect.left}px`;
                bubble.style.top = `${rect.top}px`;
                bubble.style.transform = 'translate(-50%, -50%)';
                bubble.style.animation = 'popEffect 0.5s forwards';

                

                setTimeout(() => bubble.remove(), 500);
              });

              const hue = Math.random() * 360;
                bubble.style.background = `hsla(${hue}, 70%, 60%, 0.8)`;
                if (document.body.classList.contains('dark-mode')) {
                bubble.style.filter = `drop-shadow(0 0 10px hsla(${hue}, 70%, 60%, 0.5))`;
                }


              dynamicBackground.appendChild(bubble);
              if (delay < 4000) createBubble(delay + 75);
            }, delay);

            bubbleTimers.push(timer);
          }
          for (let i = 0; i < 30; i++) {
            createBubble(i * 50);
          }
        }
      }
    ];
  
    let shapesActive = false;
  
    function clearBackground() {

        bubblesActive = false;
  bubbleTimers.forEach(timer => clearTimeout(timer));
  bubbleTimers = [];

      while (dynamicBackground.firstChild) {
        dynamicBackground.removeChild(dynamicBackground.firstChild);
      }
      dynamicBackground.style.background = "";
      dynamicBackground.style.animation = "";
      shapesActive = false;
      if (shapesTimer) {
        clearTimeout(shapesTimer);
        shapesTimer = null;
      }
      disableSpotlight();
    }

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
          const content = header.nextElementSibling;
          content.style.maxHeight = content.style.maxHeight ? null : `${content.scrollHeight}px`;
        });
      });
      
      function adjustModalPosition() {
        const modal = document.getElementById('project-modal');
        if (modal.scrollHeight > window.innerHeight * 0.8) {
          modal.style.alignItems = 'flex-start';
          modal.querySelector('.modal-content').style.maxHeight = '80vh';
        } else {
          modal.style.alignItems = 'center';
        }
      }
      
      findMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
          const projectId = button.getAttribute('data-project');
          const modalBody = modalContent.querySelector('.modal-body');
          
          modalBody.innerHTML = '';
          
          const content = document.createElement('div');
          content.className = 'project-details';
          














          if (projectId === '1') {
            content.innerHTML = `
                <h3 style="padding-top: 20px">Evolution Simulator with AI NEAT Algorithm and Custom (mini) Physics Engine in Monogame C#</h3>
                <p>
                <div style="font-size: 20px">
                        <p>
                          From January 2024 to December 2024, I developed an evolution simulator that integrates an AI system with a physics engine – all built using the MonoGame framework in C#. This project was an exploration of natural selection, where digital organisms, represented as minimalist grey dots, evolve in real time within an environment.
                        </p>
                    <br>
                        <h3>Project Overview</h3>
                        <p>
                          The aim of this simulator was to digitally replicate the intricate processes of natural selection (or however much of it I can replicate with a CPU). By utilising the NEAT (NeuroEvolution of Augmenting Topologies) algorithm, I sought to create a system in which the architecture of the neural networks is not fixed but evolves over time. This means that not only the weights and biases change, but the very structure of the networks can grow in complexity – much like biological evolution.
                        </p>
                    <br>
                        <h3>Evolving Neural Networks with NEAT</h3>
                        <p>
                          At the heart of the simulator lies the NEAT algorithm. Inspired by the paper <em>Evolving Neural Networks through Augmenting Topologies</em> by Kenneth O. Stanley and Risto Miikkulainen, I implemented a system where each organism’s neural network is treated as a genome made up of nodes and connections.
                          <br>
                        </p>
                        <ul>
                          <li>
                            <strong>Genome Representation:</strong> Every digital organism possesses its own unique neural network. In my design, neurons are represented as nodes and the synaptic connections between them carry distinct weights. This dual evolution – both in structure and parameters – allows for a rich and varied simulation of adaptation.
                            <br>
                          </li>
                          <li>
                            <strong>Mutation &amp; Crossover:</strong> I implemented mutation operations that can randomly add or remove nodes and connections, therefore introducing structural variations. Crossover functions then allow for the recombination of genetic material from different genomes, ensuring that beneficial traits are propagated. Historical markings are tracked to maintain compatibility during crossover events
                            <br>
                          </li>
                          <li>
                            <strong>Fitness Evaluation:</strong> The simulation continuously evaluates each organism’s fitness based on its ability to navigate the environment and adapt to changes. These real-time fitness scores determine which genomes are selected for reproduction, ensuring that the fittest traits survive.
                            <br>
                          </li>
                        </ul>
                    <br>
                        <h3>Custom Physics Engine</h3>
                        <p>
                          Since MonoGame does not come with a built-in physics engine, I developed a custom mini physics engine specifically tailored for this simulation.
                        </p>
                        <ul>
                          <li>
                            <strong>Collision Detection:</strong> Organisms are modelled as circular entities. I devised a collision detection system using bounding circles, which efficiently checks for overlaps and handles collisions in a realistic manner.
                            <br>
                          </li>
                          <li>
                            <strong>Gravity and Movement:</strong> Drawing on classical mechanics, I created a system that calculates gravity, friction, and momentum. Each frame, an organism’s position and velocity are updated using these principles, ensuring that their movement appears natural and consistent with real-world physics.
                            <br>
                          </li>
                          <li>
                            <strong>Grid-Based Optimisation:</strong> To manage the computational complexity of collision detection across many organisms, I implemented a grid-based tracking system. By partitioning the simulation space into cells, the system only checks for collisions among organisms within neighbouring cells. This optimises performance dramatically, reducing the O(n²) checks to a more efficient solution – a technique inspired by Sebastian Lague’s work.
                            <br>
                          </li>
                        </ul>
                    <br>
                        <h3>Real-Time Simulation Loop</h3>
                        <p>
                          Rather than using discrete generational cycles, the simulator runs continuously – allowing evolution to occur in real time.
                        </p>
                        <ul>
                          <li>
                            <strong>Main Loop:</strong> The core simulation loop integrates physics calculations, neural network evaluations, and evolutionary updates in every frame. I carefully engineered this loop to ensure that each organism’s state is updated smoothly, maintaining a responsive and fluid simulation even as complexity increases.
                            <br>
                          </li>
                          <li>
                            <strong>Event-Driven Dynamics:</strong> The environment is highly dynamic. Real-time events force organisms to continually adapt, leading to a variety of outcomes – from thriving populations to occasional mass extinctions. This unpredictability keeps the simulation both challenging and engaging.
                            <br>
                          </li>
                        </ul>
                    <br>
                        <h3>Code Architecture &amp; Design Philosophy</h3>
                        <p>
                          Every element of the codebase was designed with modularity and clarity in mind. By separating the project into distinct modules – including the NEAT algorithm, the custom physics engine, and the simulation loop – I ensured that each component could be refined independently without compromising the overall system.
                          <br>
                        </p>
                        <ul>
                          <li>
                            <strong>Modular Classes:</strong> Each functional aspect of the project is encapsulated in its own set of classes. For instance, the neural network is managed by dedicated classes that handle nodes, connections, and genome evolution, while the physics engine is implemented through classes responsible for collision detection, force calculations, and grid management.
                            <br>
                          </li>
                        </ul>
                    <br>
                        <h3>Additional Technical Details</h3>
                        <p>
                          For those interested in the finer points, here are more technical aspects of the simulator:
                          <br>
                        </p>
                        <ul>
                          <li>
                            <strong>Memory Management:</strong> Efficient resource management was crucial. I rigorously ensured that memory leaks were prevented by properly managing the lifecycle of objects, especially given the dynamic creation and deletion of organisms and neural network components.
                            <br>
                          </li>
                          <li>
                            <strong>Custom Debugging Tools:</strong> I integrated bespoke debugging and logging utilities to monitor performance, track evolution progress, and quickly identify bottlenecks or errors. These tools were invaluable during the development and refinement phases.
                            <br>
                          </li>
                          <li>
                            <strong>Customisable Parameters:</strong> The simulator includes a configuration module that allows real-time adjustments to critical parameters such as mutation rates, gravitational forces, and collision thresholds. This flexibility makes the system highly adaptable and user-friendly.
                            <br>
                          </li>
                          <li>
                            <strong>Scalability Considerations:</strong> The grid-based optimisation not only reduced computational complexity but also allowed the simulation to scale gracefully as the number of organisms increased, ensuring consistent performance even under heavy loads.
                            <br>
                          </li>
                        </ul>
                    <br>
                        <h3>Skills Showcase</h3>
                        <p>
                          While this project touches on various areas, two fundamental skills were pivotal to its success:
                          <br>
                        </p>
                        <ul>
                          <li>
                            <strong>C#:</strong> Leveraging C# within the MonoGame framework enabled me to build a robust, high-performance simulation. The language’s object-oriented features were essential for creating a modular, maintainable codebase.
                            <br>
                          </li>
                          <li>
                            <strong>Project Management:</strong> Coordinating a project of this scale required meticulous planning, time management, and iterative refinement. Balancing experimental features with performance optimisation was a challenging yet rewarding experience that demonstrated my ability to manage complex projects effectively.
                            <br>
                            <br>
                          </li>
                        </ul>

                        <h3>Conclusion</h3>
                        <p>
                          This evolution simulator is a testament to my passion for merging artificial intelligence with real-time physics. Every line of code – from the dynamic mutations in the neural networks to the finely tuned collision detection – has been crafted with careful thought and a commitment to continuous improvement. The result is a living digital ecosystem that embodies the principles of natural selection within the limits of my laptop's CPU, showcasing both my technical expertise and my ability to manage and execute complex projects.
                          <br>
                          <br>
                        </p>
                      </div>
                </p>
                 <img src="Pics/Evolution Sim 1.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Evolution Sim 2.png" 
                  alt="Project 1" 
                  style="border: 2px solid red"  
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Evolution Sim 3.png" 
                  alt="Project 1" 
                  style="border: 2px solid red"  
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
            `;







          } else if (projectId === '2') {
            content.innerHTML = `
            <h3 style="padding-top: 20px">Rocket Landing AI in a 2D environment with suitable physics and 3 boosters</h3>
            <div style="font-size: 20px">
              <p>
    From November 2024 to December 2024, I developed a rocket landing AI simulation that trains a system to safely land a virtual rocket starting from terminal velocity. Built in MonoGame using C#, this project combines a physics engine class with genetic algorithm training to achieve an adaptive, high-precision landing strategy.
  </p>
  <br>
  <h3>Project Overview</h3>
  <p>
    The primary objective of this simulation was to replicate the challenge of landing a rocket under extreme conditions. The simulation begins with the rocket descending from terminal velocity, and the AI is tasked with controlling three boosters – a central booster for parallel thrust and two side boosters for balance and directional control – to guide the rocket to a safe, controlled landing. While the simulation does not claim to be an exact replica of real-world rocket landings, it focuses on the AI’s capacity to learn and adapt through successive generations.
  </p>
  <br>
  <h3>AI and Genetic Algorithm Training</h3>
  <p>
    At the heart of the project is an adaptive AI model driven by genetic algorithms. Each rocket is managed by a neural network that processes a range of inputs and produces decisions for booster activation. Inspired by evolutionary principles, the system progressively refines its control strategy through generations.
    <br>
  </p>
  <ul>
    <li>
      <strong>Neural Network Integration:</strong> Every rocket utilises a neural network that takes in six key inputs – normalised rotation, relative height (based on the rocket’s descent), horizontal and vertical velocity, angular velocity, and the current thrust force. The network then outputs three control signals corresponding to the activation of the main booster and the side boosters.
    </li>
    <li>
      <strong>Fitness Evaluation:</strong> The simulation continuously evaluates each rocket’s performance. The fitness score is incremented for smooth, stable descents and safe landing conditions, while penalties are applied for excessive velocity, significant angular deviation, or erratic thrust. This scoring system guides the genetic algorithm in selecting and propagating the best-performing neural networks.
    </li>
    <li>
      <strong>Genetic Mutation:</strong> When a generation completes, the top-performing neural network is mutated and applied to a new set of rockets. This mutation adjusts both the weights and biases of the network, allowing for subtle refinements or drastic changes, depending on the mutation degree, to achieve optimal landing behaviour.
    </li>
  </ul>
  <br>
  <h3>Custom Physics Engine</h3>
  <p>
    To simulate a realistic environment, I developed a mini physics engine class from scratch. This engine calculates forces such as gravity, air resistance, and thrust, while also simulating angular momentum and rotational dynamics.
    <br>
  </p>
  <ul>
    <li>
      <strong>Gravity and Air Resistance:</strong> The class applies gravitational forces based on the rocket’s mass, and computes air resistance using factors such as surface area, drag coefficient, and air density. These calculations ensure that the rocket’s descent mimics real-world physics.
    </li>
    <li>
      <strong>Thrust and Torque:</strong> The system applies thrust in the direction dictated by the rocket’s rotation. Additionally, side boosters generate torque, influencing angular velocity. This dual-force mechanism is crucial for maintaining control and achieving an upright landing.
    </li>
    <li>
      <strong>Dynamic Hitbox Management:</strong> The rocket’s collision detection is managed by dynamically updating hitboxes for the main body and boosters based on the rocket’s current rotation and position. This ensures accurate detection of ground contact.
    </li>
  </ul>
  <br>
  <h3>Real-Time Simulation Loop</h3>
  <p>
    The simulation operates in a continuous loop where each frame updates the rocket’s state. Core functions update inputs, apply physics, process neural network outputs, and adjust the rocket’s motion accordingly.
  </p>
  <ul>
    <li>
      <strong>State Updates:</strong> Methods such as <code>UpdateInputs()</code> and <code>Update()</code> are invoked every frame to capture changes in rotation, position, velocity, and thrust. These updates are crucial for real-time performance and AI decision-making.
    </li>
    <li>
      <strong>Collision and Landing Checks:</strong> The simulation continually checks for intersections between the rocket’s hitboxes and the ground. Upon collision, it evaluates landing conditions – rewarding controlled, stable landings and penalising unsafe ones.
    </li>
  </ul>
  <br>
  <h3>Code Architecture &amp; Design Philosophy</h3>
  <p>
    The code is structured to promote modularity and clarity. The <code>Rocket</code> class encapsulates all aspects of the simulation – from thrust application and physics integration to fitness calculation and neural network control.
    <br>
  </p>
  <ul>
    <li>
      <strong>Modular Classes:</strong> Each functional component (neural network, physics engine, collision detection) is implemented in dedicated classes. This modularity simplifies maintenance, debugging, and future enhancements.
    </li>
    <li>
      <strong>Iterative Development:</strong> The project evolved through continuous testing and refinement. Each generation of rockets provided data that informed subsequent iterations, thereby steadily improving the AI’s performance.
    </li>
    <li>
      <strong>Debugging and Optimisation:</strong> Custom debugging tools were used to track performance metrics – such as fitness scores, angular velocity, and thrust levels – ensuring that the simulation runs efficiently within the constraints of my laptop’s CPU.
    </li>
  </ul>
  <br>
  <h3>Additional Technical Details</h3>
  <p>
    For those interested in the finer technical aspects:
    <br>
  </p>
  <ul>
    <li>
      <strong>Input Normalisation:</strong> Inputs for the neural network are normalised to ensure consistent value ranges, which enhances the stability and performance of the AI.
    </li>
    <li>
      <strong>Real-Time Parameter Adjustments:</strong> The simulation includes features to save and load neural network states, allowing for real-time experimentation with different training parameters.
    </li>
    <li>
      <strong>Efficient Generation Management:</strong> A pool of 125 rockets is maintained, with the best-performing neural network guiding the mutation process for new generations. This approach optimises the exploration of control strategies and accelerates the learning process.
    </li>
  </ul>
  <br>
  <h3>Skills Showcase</h3>
  <p>
    Although the project involves a range of technical disciplines, two core skills were particularly pivotal:
    <br>
  </p>
  <ul>
    <li>
      <strong>C#:</strong> The use of C# within the MonoGame framework allowed me to create a robust simulation that integrates advanced physics with real-time AI control.
    </li>
    <li>
      <strong>Project Management:</strong> Coordinating the development of this complex simulation required meticulous planning, iterative refinement, and a strong focus on optimisation – challenges that I embraced throughout the project.
    </li>
  </ul>
  <br>
  <h3>Conclusion</h3>
  <br>
  <p>
    The Rocket Landing AI project is an example of merging physics simulations with adaptive AI techniques. Every aspect of the code – from precise thrust calculations and dynamic hitbox management to genetic algorithm-driven neural network training – has been crafted with care and a commitment to continuous improvement. While the simulation may not replicate every nuance of real-world rocket landings, it successfully demonstrates the potential of machine learning in achieving high-precision control under challenging conditions.
    <br>
    <br>
    I am excited by the progress made and look forward to further exploring AI capabilities, exploring new optimisation techniques, and pushing the boundaries of what can be achieved through the fusion of physics simulation and genetic algorithm training.
    <br>
    <br>
  </p>
</div>





              <img src="Pics/Rocket ai 1.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Rocket ai 2.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Rocket ai 3.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
            `;












            
          } else if (projectId === '3') {
            content.innerHTML = `
              <h3 style="padding-top: 20px">Particle Simulation with Customised Physics and Real-Time Visual Effects in MonoGame C#</h3>
<div style="font-size: 20px">
  <p>
    In Febrary 2025, I developed a particle simulation that is all built using the MonoGame framework in C#. This project was an exploration into the beauty of particle dynamics, where thousands of individual particles interact in real time to create patterns that are unpredictable
  </p>
  <br>
  <h3>Project Overview</h3>
  <p>
    The aim of this particle simulation was to digitally replicate the motion of particles under various physical influences – be it gravity, wind, or collisions – all within the limitations of my laptop’s CPU. By customising every aspect of the simulation, I set out to produce a system where each particle behaves as an independent entity, yet contributes to the overall visual spectacle.
  </p>
  <br>
  <h3>Particle Dynamics and Visual Effects</h3>
  <p>
    In this simulation, every particle is treated as a self-contained unit with properties such as mass and velocity. Their interactions are governed by a range of forces, resulting in motion that mirrors natural phenomena – think of swirling smoke or a distant cosmic event.
    <br>
  </p>
  <ul>
    <li>
      <strong>Particle Behaviour:</strong> Each particle starts with a random velocity and is subjected to forces like gravity and collision responses which makes them quickly collate onto the floor.
      <br>
    </li>
    <li>
      <strong>Visual Effects:</strong> To heighten the visual impact, I incorporated dynamic effects such as fading and colour transitions based on particle speed. These effects transform a simple particle system into a visually engaging display.
      <br>
    </li>
    <li>
      <strong>Interactivity:</strong> Users can left click the mouse to create a gravitational field (simulating the moon), and particles will be attracted to it like waves, and the strength of pull is modifiable in code. Should the user right click, I added an extremely strong repulsion force that scatters the particles in all directions because why not
      <br>
    </li>
  </ul>
  <br>
  <h3>Custom Physics Engine</h3>
  <p>
    With MonoGame lacking a native physics engine, I crafted a mini physics engine class specifically for this project. This engine is responsible for calculating forces, handling collisions, and updating particle positions in real time.
  </p>
  <ul>
    <li>
      <strong>Collision Detection:</strong> Particles are modelled as small circles, and I implemented an efficient collision detection system using bounding circles. This ensures that when particles come into close contact, the resulting interactions are both realistic and visually smooth.
      <br>
    </li>
    <li>
      <strong>Force Calculations:</strong> Drawing on classical mechanics, the engine computes gravitational pulls and frictional forces every frame, updating each particle’s velocity and position to produce natural-looking movement.
      <br>
    </li>
    <li>
      <strong>Optimisation Techniques:</strong> To manage the computational load from thousands of particle interactions, I utilised a grid-based optimisation strategy. By partitioning the simulation space into cells, collision checks are limited to neighbouring particles – drastically reducing the processing
      <br>
    </li>
  </ul>
  <br>
  <h3>Real-Time Simulation Loop</h3>
  <p>
    The simulation runs in a continuous loop that integrates physics calculations, particle updates, and rendering in every frame. This real-time loop is engineered to handle a high volume of particles without compromising performance.
  </p>
  <ul>
    <li>
      <strong>Main Loop:</strong> At its core, the simulation loop seamlessly blends the updating of particle states, recalculating forces, and rendering the visual effects, ensuring that each frame is as fluid as the last.
      <br>
    </li>
  </ul>
  <br>
  <h3>Code Architecture &amp; Design Philosophy</h3>
  <p>
    As with my other projects, the codebase for the particle simulation was designed with modularity and clarity in mind. By compartmentalising the different aspects of the simulation – particle behaviour, physics calculations, and rendering – I ensured that each component could be developed and refined independently.
    <br>
  </p>
  <ul>
    <li>
      <strong>Modular Classes:</strong> Distinct classes handle specific tasks, such as generating and updating particles or managing collision detection. This modular approach not only improves maintainability but also facilitates future enhancements.
      <br>
    </li>
  </ul>
  <br>
  <h3>Additional Technical Details</h3>
  <p>
    For those who want the finer technical details, here are some additional insights:
    <br>
  </p>
  <ul>
    <li>
      <strong>Memory Management:</strong> With thousands of particles in play, efficient memory management was crucial. I implemented robust methods for creating, updating, and disposing of particle objects, ensuring smooth performance over long simulation sessions.
      <br>
    </li>
    <li>
      <strong>Custom Debugging Tools:</strong> Debugging utilities were used to track particle behaviour, monitor performance, and quickly identify any bottlenecks during runtime.
      <br>
    </li>
    <li>
      <strong>Scalability:</strong> Thanks to grid-based optimisation and efficient code practices, the system scales gracefully – handling increasing particle counts without a significant drop in performance.
      <br>
    </li>
  </ul>
  <br>
  <h3>Skills Showcase</h3>
  <p>
    Although this project involves a variety of technical aspects, two core skills were essential:
    <br>
  </p>
  <ul>
    <li>
      <strong>C#:</strong> Leveraging C# within the MonoGame framework enabled me to create a high-performance, visually compelling simulation that used advanced physics with real-time interactivity.
      <br>
    </li>
    <li>
      <strong>Project Management:</strong> Coordinating a project of this complexity demanded careful planning, time management, and iterative refinement – a challenge that I thoroughly enjoyed and learned much from.
      <br>
    </li>
  </ul>
  <br>
  <h3>Conclusion</h3>
  <br>
  <p>
    This particle simulation is an example of blending advanced visual effects with a custom-built physics engine class. Every line of code – from the dynamic force calculations to the optimised collision detection – has been crafted with precision and a commitment to continuous improvement. The result is a vibrant, ever-changing display of particle dynamics that not only highlights my technical expertise but also demonstrates my ability to manage and execute complex projects within the constraints of my laptop’s CPU.
    <br>
    <br>
  </p>
</div>
<img src="Pics/Particle Sim 1.png" 
                  alt="Project 1" 
                  style="border: 2px solid red"
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Particle Sim 2.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Particle Sim 3.png" 
                  alt="Project 1" 
                  style="border: 2px solid red"
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>

            `;





















          } else if (projectId === '4') {
            content.innerHTML = `
              <h3 style="padding-top: 20px">Digit Handwriting AI Application using C# and Windows Forms</h3>
<div style="font-size: 20px">
  <p>
    In February 2025, I developed a digit handwriting recognition AI application using C# and Windows Forms. This project was the first time I used Windows Forms so I watched several tutorials on UI design and event-driven programming before integrating everything with a custom-built neural network.
  </p>
  <br>
  <h3>Project Overview</h3>
  <p>
    The objective was to create a robust neural network capable of recognising handwritten digits with high accuracy. Inspired by Sebastian Lague’s videos on neural networks (again), I built the entire neural network from scratch without using any specialised APIs or pre-built libraries (apart from MathNet Numerics for optimisation). Key modifications were made to standard concepts. For example, I tweaked the ReLU and sigmoid activation functions to better suit my data and application.
  </p>
  <br>
  <h3>Data Acquisition &amp; Preprocessing</h3>
  <p>
    A number of technical challenges arose during data preparation:
  </p>
  <ul>
    <li>
      <strong>Dataset Sourcing:</strong>
      <ul>
        <li>I downloaded a dataset of handwritten digits from Kaggle. I originally coded my application so it reads off images with black handwriting on a white background. This would make it easier to give in values as each pixel is either black or white, but the data set I downloaded had a blank background instead so i had to modify code accordingly</li>
      </ul>
    </li>
    <li>
      <strong>Preprocessing Pipeline:</strong>
      <ul>
        <li>Each PNG image was converted into a 28×28 bitmap and transformed to grayscale</li>
        <li>The images were then inverted so that the white background mapped to 0 and the digit’s strokes to values closer to 1.</li>
        <li>All pixel intensities were normalised between 0 and 1, ensuring consistent inputs for the gradient descent algorithm.</li>
      </ul>
    </li>
    <li>
      <strong>Efficient Data Handling:</strong>
      <ul>
        <li>Given the dataset’s size (approximately 50,000 images), I preprocessed the data once and saved it as a text file rather than using CSVs or reloading all the data each time. This reduced loading times from ~40mins (loading pngs) to about 9 mins (loading from a saved text file neural network)</li>
        <li>This allowed me to quickly resume training without having to repeatedly re-read and process tens of thousands of PNG files.</li>
      </ul>
    </li>
  </ul>
  <br>
  <h3>Neural Network Architecture</h3>
  <p>
    The design of the network is as follows:
  </p>
  <ul>
    <li>
      <strong>Input Layer:</strong> 784 neurons (each 28×28 image is flattened into 784 inputs).
    </li>
    <li>
      <strong>Hidden Layer:</strong>
      <ul>
        <li>I implemented a dynamic layer system; for this project, I found that one hidden layer consisting of 90 neurons strikes a good balance between performance and speed.</li>
        <li>ReLU is used as the activation function in the hidden layer, with slight modifications inspired by Sebastian Lague’s tutorials.</li>
      </ul>
    </li>
    <li>
      <strong>Output Layer:</strong>
      <ul>
        <li>Consists of 10 neurons corresponding to digits 0 through 9.</li>
        <li>A softmax function is applied to produce a probability distribution over the outputs.</li>
      </ul>
    </li>
    <li>
      <strong>Training Process:</strong>
      <ul>
        <li>Backpropagation with cross-entropy loss is used in conjunction with gradient descent.</li>
        <li>Frequent saving of the network state allows training to be paused and resumed, which is critical given my hardware constraints.</li>
      </ul>
    </li>
  </ul>
  <br>
  <h3>Training Challenges &amp; Visualisation</h3>
  <p>
    Running training on a basic laptop (without a dedicated GPU) introduced several challenges:
  </p>
  <ul>
    <li>
      <strong>Hardware Constraints:</strong>
      <ul>
        <li>Processing 50,000 images is computationally expensive, and my laptop frequently overheats, limiting the number of epochs I can run in one session.</li>
        <li>This made me add a checkpoint system to save training progress and the use of text files for data storage.</li>
      </ul>
    </li>
    <li>
      <strong>Hyperparameter Tuning:</strong>
      <ul>
        <li>Extensive experimentation with learning rates, mini-batch sizes, and epoch counts was required. For example, I found that a learning rate of around 0.1 was effective initially, though further fine-tuning was still needed.</li>
      </ul>
    </li>
    <li>
      <strong>Cost Logging and Chart Visualisation:</strong>
      <ul>
        <li>During training, I log the average cost per epoch and append these values to a file ("training_log_cost.txt").</li>
        <li>A Chart control in the UI plots these costs in real time – with epochs on the X-axis and cost values (which initially ranged between approximately 2 and 4) on the Y-axis.</li>
        <li>This visual feedback is instrumental in real-time troubleshooting and fine-tuning the network.</li>
        <li>If the training is effective in a perfect world, the graph would show an exponential decrease until levelling off at some low cost value, indicating that the training has converged</li>
      </ul>
    </li>
  </ul>
  <br>
  <h3>Observations and Insights</h3>
  <p>
    One of the most fascinating aspects was observing how the network recognised patterns:
  </p>
  <ul>
    <li>
      For instance, when I wrote a “0”, the network sometimes misclassified it as an “8” or “9” due to the similar circular shapes in these digits. This clearly demonstrates that the AI is not 'seeing' digits in a human sense but is instead detecting patterns based solely on pixel intensities and learned weight distributions.
    </li>
    <li>
      The project reinforced how critical proper data preprocessing is because even small discrepancies in normalisation can cause the gradient descent algorithm to fail to converge.
    </li>
  </ul>
  <br>
  <h3>Conclusion and Future Work</h3>
  <p>
    Overall, this Digit Handwriting AI project has been an incredibly informative journey into neural networks, image processing, and real-world training constraints on limited hardware. Despite the challenges, from hardware limitations and overheating issues to the intricacies of data normalisation, the project has yielded a functional system that can recognise digits with impressive accuracy, even if some misclassifications still occur.
  </p>
</div>

              <img src="Pics/Handwriting ai 1.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Handwriting ai 2.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Handwriting ai 3.png" 
                  alt="Project 1" 
                  style="border: 2px solid red" 
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
                  <img src="Pics/Handwriting ai 4.png" 
                  alt="Project 1" 
                  style="border: 2px solid red"
                  onerror="console.error('Failed to load image:', this.src)">
                  <br>
            `;








          } else {
            content.innerHTML = `
              <h3>Project Title</h3>
              <p>Detailed project information...</p>
            `;
          }
          




























          modalBody.appendChild(content);
          

          modal.style.display = 'flex';
          document.body.classList.add('modal-open');
          modeToggleBtn.style.display = 'none';
          

          adjustModalPosition();
        });
      });

      document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          card.style.setProperty('--x', `${e.clientX - rect.left}px`);
          card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
      });

    function applyCurrentBackground() {
      if (currentEffectName === "Floating Bubbles") {
        dynamicBackground.querySelectorAll('.bubble').forEach(bubble => {
          bubble.style.background = document.body.classList.contains('dark-mode')
            ? 'rgba(25,25,112,0.8)'
            : 'rgba(100,149,237,0.8)';
        });
        backgroundIndicator.innerText = currentEffectName;
      } else if (currentEffectName === "Floating Shapes") {
        dynamicBackground.querySelectorAll('.shape').forEach(shape => {
          if (shape.classList.contains('triangle')) {
            shape.style.borderBottomColor = document.body.classList.contains('dark-mode')
              ? 'rgba(25,25,112,0.8)'
              : 'rgba(255,182,193,0.8)';
          } else {
            shape.style.background = document.body.classList.contains('dark-mode')
              ? 'rgba(25,25,112,0.8)'
              : 'rgba(255,182,193,0.8)';
          }
        });
        backgroundIndicator.innerText = currentEffectName;
      } else {
        clearBackground();
        backgroundEffects[currentEffectIndex].init();
        backgroundIndicator.innerText = backgroundEffects[currentEffectIndex].name;
        currentEffectName = backgroundEffects[currentEffectIndex].name;
      }
    }
  

    currentEffectIndex = 0;
    currentEffectName = backgroundEffects[currentEffectIndex].name;
    backgroundEffects[0].init();
  

    backgroundIndicator.addEventListener('click', function() {
        clearBackground();
        currentEffectIndex = (currentEffectIndex + 1) % backgroundEffects.length;
        currentEffectName = backgroundEffects[currentEffectIndex].name;
        

        backgroundIndicator.innerText = currentEffectName;
        

        backgroundEffects[currentEffectIndex].init();
      });
  
  });
  

  document.addEventListener('click', function(e) {
    const bubbles = document.querySelectorAll('.bubble:not([data-popping])');
    const isDarkMode = document.body.classList.contains('dark-mode');
  
    bubbles.forEach(bubble => {
      const rect = bubble.getBoundingClientRect();
      if (e.clientX < rect.left || e.clientX > rect.right ||
          e.clientY < rect.top || e.clientY > rect.bottom) return;
  
      bubble.setAttribute('data-popping', 'true');
      const computedStyle = getComputedStyle(bubble);
      const matrix = new DOMMatrix(computedStyle.transform);
      const x = rect.left  - matrix.m41;
      const y = rect.top  - matrix.m42;
      const hue = bubble.style.getPropertyValue('--hue') || '200';
  
      bubble.style.position = 'fixed';
      bubble.style.left = `${x}px`;
      bubble.style.top = `${y}px`;
      bubble.style.transform = computedStyle.transform;
      bubble.style.zIndex = '9999';
  

      const animationSettings = isDarkMode ? {
        keyframes: [
          { 
            transform: `${computedStyle.transform} scale(1)`,
            opacity: 1,
            filter: `brightness(2) drop-shadow(0 0 30px hsla(${hue}, 95%, 70%, 1))`
          },
          { 
            transform: `${computedStyle.transform} scale(4)`,
            opacity: 0.5,
            filter: `brightness(4) drop-shadow(0 0 50px hsla(${hue}, 95%, 70%, 1))`
          },
          { 
            transform: `${computedStyle.transform} scale(6)`,
            opacity: 0,
            filter: `brightness(0) drop-shadow(0 0 0 hsla(${hue}, 95%, 70%, 0))`
          }
        ],
        duration: 600,
        easing: 'cubic-bezier(0.68, -0.55, 0.27, 1.55)'
      } : {
        keyframes: [
          { transform: `${computedStyle.transform} scale(1)`, opacity: 1 },
          { transform: `${computedStyle.transform} scale(3)`, opacity: 0 }
        ],
        duration: 400,
        easing: 'ease-out'
      };
  
      const popAnimation = bubble.animate(animationSettings.keyframes, {
        duration: animationSettings.duration,
        easing: animationSettings.easing
      });
  

      if (isDarkMode) {
        const explosionParticles = document.createElement('div');
        explosionParticles.style.cssText = `
          position: fixed;
          left: ${x}px;
          top: ${y}px;
          width: 20px;
          height: 20px;
          pointer-events: none;
          background: radial-gradient(circle at center, 
            hsla(${hue}, 95%, 70%, 0.8) 0%, 
            hsla(${hue}, 95%, 70%, 0) 70%);
          transform: translate(-50%, -50%);
          z-index: 9998;
        `;
        document.body.appendChild(explosionParticles);
        explosionParticles.animate([
          { transform: 'scale(1)', opacity: 1 },
          { transform: 'scale(5)', opacity: 0 }
        ], { duration: 800, easing: 'ease-out' }).onfinish = () => {
          explosionParticles.remove();
        };
      }
  
      popAnimation.onfinish = () => bubble.remove();
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    const achievementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          achievementObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    achievementCards.forEach(card => {
      achievementObserver.observe(card);
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    const achievementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          achievementObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    achievementCards.forEach(card => {
      achievementObserver.observe(card);
    });
  });
  

document.querySelectorAll('.achievement-img-container').forEach(container => {
  let tapTimer;
  

  container.addEventListener('touchstart', function(e) {
    tapTimer = setTimeout(() => {
      this.classList.toggle('active');
      document.body.style.overflow = this.classList.contains('active') ? 'hidden' : 'auto';
    }, 200);
  });


  container.addEventListener('touchmove', function() {
    clearTimeout(tapTimer);
  });


  container.addEventListener('click', function(e) {
    if(window.innerWidth > 768) {
      this.classList.toggle('active');
    }
  });
});


document.addEventListener('touchstart', function(e) {
  if(!e.target.closest('.achievement-img-container')) {
    document.querySelectorAll('.achievement-img-container').forEach(container => {
      container.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }
});

  
