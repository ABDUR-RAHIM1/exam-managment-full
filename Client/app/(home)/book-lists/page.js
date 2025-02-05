"use client";
import { useEffect, useState } from "react";
import NoDataFound from "@/app/components/Globals/NoDataFound";
import Heading from "@/app/helpers/Heading";
import { getBooks } from "./getBooks";
import BookCard from "./BookCard";
import Loading from "@/app/components/Globals/Loading";

const BookLists = () => {
    const [searchText, setSearchText] = useState("")
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value)
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const { status, result } = await getBooks();
                if (status === 200) {
                    setBooks(result);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const filteredBooks = books?.filter((book) =>
        book.bookName.toLowerCase().includes(searchText.toLowerCase())
    );



    if (loading) {
        return <Loading />
    }
 

    if (!books || books.length === 0) {
        return <NoDataFound />;
    }

    return (
        <div className="px-5 md:px-10 py-10 bg-white">
            <Heading text={"📚 PDF Books"} center={true} />

            {/* Search Bar */}
            <div className="my-12 w-full md:w-[60%] mx-auto">
                <input
                    type="search"
                    name="search"
                    onChange={handleSearchChange}
                    className="py-3 px-4 w-full rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="🔍 Search for a book..."
                />
            </div>

            {/* Book Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBooks && filteredBooks.length <= 0 ?
                    <NoDataFound text={"book not found!"} />
                :filteredBooks.map((book) => (
                <BookCard
                    key={book._id}
                    bookInfo={book}
                />
                ))}
            </div>
        </div>
    );
};

export default BookLists;
