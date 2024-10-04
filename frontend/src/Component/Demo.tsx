import { useState, useEffect, FormEvent } from "react";
import linkicon from "../assets/link.svg";
import copy from "../assets/copy.svg";
import loader from "../assets/loader.svg";
import deleteIcon from "../assets/delete.svg";
import tick from "../assets/tick.svg"; // Add the tick icon
import { useLazyGetSummaryQuery } from "../Component/Article"; // Make sure this import is correct

// Define types for the article state and fetched response
interface Article {
  url: string;
  summary: string;
}

interface ApiError {
  data?: {
    error?: string;
  };
}

const Demo = () => {
  const [article, setArticle] = useState<Article>({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [copiedUrl, setCopiedUrl] = useState<string>(""); // To track which URL is copied
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false); // To track if summary is copied

  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Fetch articles from local storage on component mount
  useEffect(() => {
    const articlesFromLocalStorage = localStorage.getItem("articles");
    if (articlesFromLocalStorage) {
      setAllArticles(JSON.parse(articlesFromLocalStorage) as Article[]);
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await getSummary({ articleUrl: article.url });
      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary };
        const updatedAllArticles = [newArticle, ...allArticles];

        // Update state
        setArticle(newArticle);
        setAllArticles(updatedAllArticles);

        // Save to local storage
        localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
      }
    } catch (err) {
      console.error("Error fetching summary:", err);
    }
  };

  const handleCopy = (text: string, isSummary: boolean = false) => {
    navigator.clipboard.writeText(text);
    if (isSummary) {
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2000); // Reset after 2 seconds
    } else {
      setCopiedUrl(text);
      setTimeout(() => setCopiedUrl(""), 2000); // Reset after 2 seconds
    }
  };

  const handleDelete = (urlToDelete: string) => {
    const updatedArticles = allArticles.filter(item => item.url !== urlToDelete);
    setAllArticles(updatedArticles);

    // Update localStorage
    localStorage.setItem("articles", JSON.stringify(updatedArticles));

    // Clear the displayed article if it's the one being deleted
    if (article.url === urlToDelete) {
      setArticle({ url: "", summary: "" });
    }
  };

  return (
    <section className="max-w-xl w-full">
      <div className="w-full flex flex-col gap-2">
        {/* Form for submitting URL */}
        <div className="relative flex items-center justify-center">
          <img src={linkicon} alt="link_icon" className="absolute left-0 my-2 ml-3 w-5" />
          <input
            type="url"
            placeholder="Enter a URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="block w-full rounded-md border border-gray-200 bg-white py-2.5 pl-10 pr-12 text-sm shadow-lg font-satoshi font-medium focus:border-black focus:outline-none focus:ring-0 peer"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="hover:border-gray-700 hover:text-gray-700 absolute inset-y-0 right-0 my-1.5 mr-1.5 flex w-10 items-center justify-center rounded border border-gray-200 font-sans font-medium text-gray-400 peer-focus:border-gray-700 peer-focus:text-gray-700 text-lg"
          >
            ↵
          </button>
        </div>

        {/* Display URL History */}
        <div className="flex flex-col gap-5 overflow-y-auto max-h-60 p-4 relative shadow-md">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
               {/* Copy Icon */}
              <div className="copy_btn " onClick={() => handleCopy(item.url)}>
                <img src={copiedUrl === item.url ? tick : copy} alt="copy_icon" className="w-[40%] h-[40%] object-cover" />
              </div>
              <p className="flex-1 font-orbitron text-sky-700 font-medium text-sm truncate">
                {item.url}
              </p>
               {/* Delete Icon */}
              <button
              className="link_card"
              onClick={() => handleDelete(article.url)}
              title="Delete this article"
            >
              <img src={deleteIcon} alt="delete_icon" className="w-3 h-3" />
            </button>
            </div>
          ))}
        </div>

        {/* Loading or Error State */}
        <div className="flex max-w-full items-center justify-center">
          {isFetching ? (
            <img src={loader} alt="loader_icon" className="w-20 h-20 object-cover" />
          ) : error ? (
            <p className="font-bold text-center text-black font-orbitron">
              Well, that wasn't supposed to happen...
            </p>
          ) : null}
        </div>

        {/* Display Errors */}
        {error && (
          <p className="text-red-500">
            Error fetching summary. Please try again.
            <br />
            <span>{(error as ApiError)?.data?.error}</span>
          </p>
        )}

        {/* Display Article Summary */}
        {article.summary && (
          <div className="flex flex-col gap-3 mb-10 p-4 bg-slate-50 relative shadow-md">
            <h2 className="font-bold font-satoshi text-xl text-center mb-4">
              Article <span className="blue_gradient">Summary</span>
            </h2>
            <p className="summary_box font-sans font-medium p-4">{article.summary}</p>
            
            {/* Copy Summary Button */}
            <button
              className="absolute top-4 left-4 p-2 rounded-full"
              onClick={() => handleCopy(article.summary, true)}
              title="Copy Summary"
            >
              <img src={copiedSummary ? tick : copy} alt="copy_icon" className="w-5 h-5" />
            </button>

            {/* Delete Icon */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full"
              onClick={() => handleDelete(article.url)}
              title="Delete this article"
            >
              <img src={deleteIcon} alt="delete_icon" className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;
