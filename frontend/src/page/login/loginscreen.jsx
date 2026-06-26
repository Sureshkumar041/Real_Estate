import { useContext, useEffect, useRef, useState } from "react";
import "./style.css";
import { useFormik } from "formik";
import { LoginSchema } from "../../common/formValidation";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export default function LoginScreen() {
    const navigate = useNavigate()
    const { setUserDetail } = useContext(AuthContext)
    const [showPassword, setShowPassword] = useState(false);
    const formRef = useRef(null);
    const [particles, setParticles] = useState([]);
    const particlesRef = useRef([]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: LoginSchema,
        onSubmit: (v) => {
            setUserDetail({ email: v?.email })
            toast.success("Login Successfully.", {
                position: "top-right"
            })
            navigate("/home")
            localStorage.setItem("token", JSON.stringify({ email: v?.email }))
            return true
        }
    })

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
                <div className="greeting-container">
                    <div className="greeting">{getGreeting()}</div>

                    <h1>
                        Welcome <span>Back</span>
                    </h1>

                    <p>Access your intelligent workspace.</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="field">
                        <label>Email</label>
                        <input
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="you@company.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="error">{formik.errors.email}</span>
                        )}
                    </div>
                    <div className="field">
                        <label>Password</label>

                        <div className="password">
                            <input
                                name="password"
                                value={formik.values.password}
                                type={showPassword ? "text" : "password"}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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

                        {formik.touched.password && formik.errors.password && (
                            <span className="error">{formik.errors.password}</span>
                        )}
                    </div>

                    <div className="remember-me">
                        <label className="con">
                            <input type="checkbox" />
                            Remember me
                        </label>

                        <Link className="link">
                            Forgot password?
                        </Link>
                    </div>

                    <button className="btn login-btn" type="submit">
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}