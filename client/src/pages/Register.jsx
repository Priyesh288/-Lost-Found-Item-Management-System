import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { UserPlus, Mail, Lock, User, Loader2 } from 'lucide-react';

const Register = ({ setAuth }) => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await api.post('/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setAuth(true);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="glass-card w-full max-w-md p-8 animate-fade-in">
                <div className="text-center mb-8">
                    <div className="bg-secondary/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="text-secondary" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                    <p className="text-text-muted">Join the community to find lost items</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted flex items-center gap-2">
                            <User size={16} /> Full Name
                        </label>
                        <input
                            type="text"
                            required
                            className="input-field"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted flex items-center gap-2">
                            <Mail size={16} /> Email Address
                        </label>
                        <input
                            type="email"
                            required
                            className="input-field"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-text-muted flex items-center gap-2">
                            <Lock size={16} /> Password
                        </label>
                        <input
                            type="password"
                            required
                            className="input-field"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button disabled={loading} type="submit" className="btn-primary w-full py-4 text-lg">
                        {loading ? <Loader2 className="animate-spin" /> : 'Register Now'}
                    </button>
                </form>

                <p className="text-center mt-8 text-text-muted">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
