import { useEffect, useRef, useState } from "react";
// import "./loginScreen.css";
import "./style.css";

export default function LoginScreen() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const formRef = useRef(null);
    const [particles, setParticles] = useState([]);

    const particlesRef = useRef([]);

    const handleMouseMove = (e) => {
        const rect = formRef.current.getBoundingClientRect();

        const isOutside =
            e.clientX < rect.left ||
            e.clientX > rect.right ||
            e.clientY < rect.top ||
            e.clientY > rect.bottom;

        if (!isOutside) return;

        const newParticles = Array.from({ length: 2 }).map(() => ({
            x: e.clientX,
            y: e.clientY,
            vx: (Math.random() - 0.5) * 0.6, // 👈 slower
            vy: (Math.random() - 0.5) * 0.6, // 👈 slower
            life: 1,
        }));

        particlesRef.current.push(...newParticles);
        setParticles([...particlesRef.current]);
    };

    useEffect(() => {
        let animationId;

        const animate = () => {
            particlesRef.current = particlesRef.current
                .map((p) => ({
                    ...p,
                    x: p.x + p.vx,
                    y: p.y + p.vy,
                    life: p.life - 0.01, // 👈 slower fade
                }))
                .filter((p) => p.life > 0);

            setParticles([...particlesRef.current]);

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationId);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.email) newErrors.email = "Email required";
        else if (!emailRegex.test(form.email))
            newErrors.email = "Invalid email";

        if (!form.password) newErrors.password = "Password required";
        else if (form.password.length < 6)
            newErrors.password = "Min 6 characters";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        console.log("LOGIN:", form);
    };

    const getGreeting = () => {
        const hour = new Date().getHours();

        if (hour >= 5 && hour < 12) return "Good MORNING :)";
        if (hour >= 12 && hour < 17) return "Good AFTERNOON :)";
        if (hour >= 17 && hour < 21) return "Good EVENING :)";
        return "Good NIGHT :)";
    };

    return (
        <div className={`page`} onMouseMove={handleMouseMove}>
            <div className="noise"></div>
            <div className="grid"></div>

            <div className="orb orb1"></div>
            <div className="orb orb2"></div>
            <div className="orb orb3"></div>

            {/* <div className="particles">
                {[...Array(25)].map((_, i) => (
                    <span
                        key={i}
                        className="particle-dot"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.2}s`,
                        }}
                    />
                ))}
            </div> */}

            {/* particles layer */}
            <div className="particle-layer">
                {particles.map((p, i) => (
                    <span
                        key={i}
                        className="particle"
                        style={{
                            left: p.x,
                            top: p.y,
                            opacity: p.life,
                        }}
                    />
                ))}
            </div>

            <div className="card" ref={formRef}>
                <div className="header">
                    <div className="logo">{getGreeting()}</div>

                    <h1>
                        Welcome <span>Back</span>
                    </h1>

                    <p>Access your intelligent workspace.</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>

                    <div className="field">
                        <label>Password</label>

                        <div className="password">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                            />

                            <button
                                type="button"
                                className="toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {errors.password && (
                            <span className="error">{errors.password}</span>
                        )}
                    </div>

                    <div className="remember-me">
                        <label className="con">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <a href="#" className="link">
                            Forgot password?
                        </a>
                    </div>

                    <button className="btn" type="submit">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}