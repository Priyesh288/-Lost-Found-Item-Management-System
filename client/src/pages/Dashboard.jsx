import { useState, useEffect } from 'react';
import api from '../utils/api';
import ItemCard from '../components/ItemCard';
import { Plus, Search, LogOut, Package, X, Loader2 } from 'lucide-react';

const Dashboard = ({ setAuth }) => {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        itemName: '',
        description: '',
        type: 'Lost',
        location: '',
        contactInfo: ''
    });

    const user = JSON.parse(localStorage.getItem('user'));

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await api.get('/items');
            setItems(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearch(query);
        if (query.trim() === '') {
            fetchItems();
            return;
        }
        try {
            const res = await api.get(`/items/search?name=${query}`);
            setItems(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingItem) {
                await api.put(`/items/${editingItem._id}`, formData);
            } else {
                await api.post('/items', formData);
            }
            setShowModal(false);
            setEditingItem(null);
            setFormData({ itemName: '', description: '', type: 'Lost', location: '', contactInfo: '' });
            fetchItems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await api.delete(`/items/${id}`);
                fetchItems();
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setFormData({
            itemName: item.itemName,
            description: item.description,
            type: item.type,
            location: item.location,
            contactInfo: item.contactInfo
        });
        setShowModal(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Lost & Found</h1>
                    <p className="text-text-muted">Welcome back, <span className="text-primary">{user?.name}</span></p>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
                        <input
                            type="text"
                            placeholder="Search items..."
                            className="input-field pl-10"
                            value={search}
                            onChange={handleSearch}
                        />
                    </div>
                    <button onClick={handleLogout} className="p-3 hover:bg-white/10 rounded-xl text-red-400 transition-colors">
                        <LogOut size={24} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                    <Package className="text-primary" /> Recent Items
                </h2>
                <button 
                    onClick={() => {
                        setEditingItem(null);
                        setFormData({ itemName: '', description: '', type: 'Lost', location: '', contactInfo: '' });
                        setShowModal(true);
                    }} 
                    className="btn-primary"
                >
                    <Plus size={20} /> Post Item
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-primary" size={48} />
                    <p className="text-text-muted">Loading items...</p>
                </div>
            ) : items.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                    {items.map(item => (
                        <ItemCard 
                            key={item._id} 
                            item={item} 
                            currentUserId={user?.id}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 glass-card">
                    <Package size={64} className="mx-auto text-text-muted/30 mb-4" />
                    <p className="text-xl text-text-muted">No items found matching your search.</p>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card w-full max-w-lg p-8 animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold">{editingItem ? 'Edit Item' : 'Post New Item'}</h3>
                            <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <label className="text-sm text-text-muted block mb-1">Item Name</label>
                                    <input
                                        required
                                        className="input-field"
                                        value={formData.itemName}
                                        onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                                    />
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="text-sm text-text-muted block mb-1">Type</label>
                                    <select 
                                        className="input-field"
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                    >
                                        <option value="Lost">Lost</option>
                                        <option value="Found">Found</option>
                                    </select>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <label className="text-sm text-text-muted block mb-1">Location</label>
                                    <input
                                        required
                                        className="input-field"
                                        value={formData.location}
                                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm text-text-muted block mb-1">Contact Info</label>
                                    <input
                                        required
                                        className="input-field"
                                        placeholder="Phone or Email"
                                        value={formData.contactInfo}
                                        onChange={(e) => setFormData({...formData, contactInfo: e.target.value})}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label className="text-sm text-text-muted block mb-1">Description</label>
                                    <textarea
                                        rows="3"
                                        className="input-field resize-none"
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    ></textarea>
                                </div>
                            </div>
                            <button type="submit" className="btn-primary w-full py-3 mt-4">
                                {editingItem ? 'Update Item' : 'Post Item'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
