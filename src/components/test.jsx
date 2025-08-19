  const [sampleReviews, setSampleReviews] = useState([]);
  const { id } = useParams();
  const pkid = `${id}`;
  const getAllFeedbacks = async () => {
    try {
      const res = await axios.post(
        `https://partnermeatwala.com/api/restaurantmaster/getreviewdetaisforrest`,
        { pkid }
      );
      setSampleReviews(res.data.list);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };


  useEffect(() => {
    getAllFeedbacks();
  }, []);