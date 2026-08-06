import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategoriesService } from "../../service/category.service";
import "./style.css";

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {

        setLoading(true);

        const res = await getCategoriesService({
            // status: "active",
            // sortOrder: "DESC",
        });

        if (res.success) {
            setCategories(res.data.categories || []);
        } else {
            toast.error(res.message);
        }

        setLoading(false);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="category-list">
            <div className="card">
                <div className="card-header">
                    <h2>Category List</h2>
                    <button className="add-btn">+ Add Category</button>
                </div>

                <div className="table-container">
                    {
                        loading ? <p>Loading...</p> :
                            <table className="category-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Category Name</th>
                                        <th>Status</th>
                                        <th>Created Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {categories.map((item, index) => (
                                        <tr key={item.categoryId}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>

                                            <td>
                                                <span className={`status ${item.status}`}>
                                                    {item.status}
                                                </span>
                                            </td>

                                            <td>
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>

                                            <td>
                                                <button className="action-btn edit-btn">
                                                    Edit
                                                </button>

                                                <button className="action-btn delete-btn">
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                    }
                </div>
            </div>
        </div>
    );
};

export default CategoryList;