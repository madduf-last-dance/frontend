import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div className="flex flex-col gap-2">
            <h2>404 Not Found </h2>
            <Link to="/">Go back to Home</Link>
        </div>
    );
}