import { MapPin, Calendar, Phone, Trash2, Edit3 } from 'lucide-react';

const ItemCard = ({ item, currentUserId, onDelete, onEdit }) => {
    const isOwner = item.owner?._id === currentUserId || item.owner === currentUserId;

    return (
        <div className="glass-card p-6 flex flex-col gap-4 hover:border-primary/50 transition-all group">
            <div className="flex justify-between items-start">
                <span className={`badge ${item.type === 'Lost' ? 'badge-lost' : 'badge-found'}`}>
                    {item.type}
                </span>
                {isOwner && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(item)} className="p-2 hover:bg-white/10 rounded-lg text-blue-400">
                            <Edit3 size={18} />
                        </button>
                        <button onClick={() => onDelete(item._id)} className="p-2 hover:bg-white/10 rounded-lg text-red-400">
                            <Trash2 size={18} />
                        </button>
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-xl font-bold text-white mb-1">{item.itemName}</h3>
                <p className="text-text-muted text-sm line-clamp-2">{item.description}</p>
            </div>

            <div className="space-y-2 mt-auto pt-4 border-t border-glass-border">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <MapPin size={14} className="text-primary" />
                    {item.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Calendar size={14} className="text-secondary" />
                    {new Date(item.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-2 text-sm text-text-muted">
                    <Phone size={14} className="text-green-400" />
                    {item.contactInfo}
                </div>
            </div>

            <div className="mt-2 text-xs text-text-muted italic">
                Posted by: {item.owner?.name || 'Unknown'}
            </div>
        </div>
    );
};

export default ItemCard;
