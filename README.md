# VisuaLive

Web-based music visualization platform with AI-powered preset generation. Create stunning, real-time audio-reactive visuals using WebGL.

## Features

- **Instant Visual Magic** — Drop in any audio and get mesmerizing visuals in seconds
- - **AI-Powered Creation** — Describe a visual style in plain English, get a custom preset
  - - **Stream-Ready** — One-click integration with OBS, Twitch, and YouTube Live
    - - **Community-Driven** — Share, remix, and discover presets from thousands of creators
      - - **Professional Exports** — Render high-quality videos for music releases and content
       
        - ## Tech Stack
       
        - - **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS, WebGL
          - - **Audio**: Web Audio API, FFT Analysis
            - - **AI**: Claude API for preset generation
              - - **Backend**: Supabase (PostgreSQL + Auth)
                - - **Payments**: Stripe
                  - - **Export**: FFmpeg WASM
                   
                    - ## Getting Started
                   
                    - ### Prerequisites
                    - - Node.js 18+
                      - - npm or yarn
                       
                        - ### Installation
                       
                        - ```bash
                          git clone https://github.com/informediate/VisuaLive.git
                          cd VisuaLive
                          npm install
                          ```

                          ### Setup Environment Variables

                          Create a `.env.local` file:

                          ```
                          NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
                          NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
                          NEXT_PUBLIC_CLAUDE_API_KEY=your_claude_api_key
                          NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_key
                          ```

                          ### Development

                          ```bash
                          npm run dev
                          ```

                          Open [http://localhost:3000](http://localhost:3000) in your browser.

                          ## Project Structure

                          ```
                          VisuaLive/
                          ├── app/                          # Next.js 14 app directory
                          │   ├── page.tsx                 # Landing page
                          │   ├── visualizer/              # Main visualizer app
                          │   └── api/                     # API routes
                          ├── components/
                          │   ├── ui/                      # shadcn components
                          │   ├── visualizer/              # Canvas, controls
                          │   └── editor/                  # Preset editor
                          ├── lib/
                          │   ├── audio/                   # Audio engine
                          │   ├── shaders/                 # Shader management
                          │   └── utils/                   # Utilities
                          └── hooks/                       # Custom React hooks
                          ```

                          ## Development Roadmap

                          ### Phase 1: Foundation (Week 1-2)
                          - Project setup and tooling
                          - - Basic audio input
                            - - Simple canvas rendering
                             
                              - ### Phase 2: Core Visualization (Week 3-4)
                              - - WebGL implementation
                                - - Real-time frequency visualization
                                  - - Shader system
                                   
                                    - ### Phase 3: AI Generation (Week 5-6)
                                    - - Claude API integration
                                      - - Preset generation from prompts
                                        - - Preset management
                                         
                                          - ### Phase 4: Community (Week 7-8)
                                          - - User authentication
                                            - - Preset sharing
                                              - - Community features
                                               
                                                - ### Phase 5: Export & Pro Features (Week 9-10)
                                                - - FFmpeg integration
                                                  - - Video export
                                                    - - Subscription system
                                                     
                                                      - ### Phase 6: Polish & Launch (Week 11-12)
                                                      - - Performance optimization
                                                        - - Streaming integration
                                                          - - Production launch
                                                           
                                                            - ## License
                                                           
                                                            - MIT
                                                           
                                                            - ## Contact
                                                           
                                                            - Built with ❤️ for music visualizer enthusiasts.
