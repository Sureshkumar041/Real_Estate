import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategoriesService } from "../../service/category.service";

const CategoryList = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const getCategories = async () => {

        setLoading(true);

        const res = await getCategoriesService({
            status: "active",
            sortOrder: "DESC",
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
        <div className="container">
            <h2>Category List</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Created At</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((item, index) => (
                                <tr key={item.categoryId}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.status}</td>
                                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">
                                    No categories found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CategoryList;