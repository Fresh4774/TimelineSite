const events = [
{
  date: {
    from: 1000,
    to: 2000 },

  role: "Introduction-1",
  company: "Title-1",
  location: "Location-1",
  content:
  "Description-1" },

{
  date: {
    from: 2000,
    to: 3000 },

  role: "Introduction-2",
  company: "Title-2",
  location: "Location-2",
  content:
  "Description-2" },

  {
    date: {
      from: 3000,
      to: 4000 },
  
    role: "Introduction-3",
    company: "Title-3",
    location: "Location-3",
    content:
    "Description-3" },

    {
      date: {
        from: 4000,
        to: 5000 },
    
      role: "Introduction-4",
      company: "Title-4",
      location: "Location-4",
      content:
      "Description-4" },

  {
    date: {
      from: 5000,
      to: 6000 },
  
    role: "Introduction-5",
    company: "Title-5",
    location: "Location-5",
    content:
    "Description-5" },

  {
    date: {
      from: 6000,
      to: 7000 },
  
    role: "Introduction-6",
    company: "Title-6",
    location: "Location-6",
    content:
    "Description-6" },

  {
    date: {
      from: 7000,
      to: 8000 },
  
    role: "Introduction-7",
    company: "Title-7",
    location: "Location-7",
    content:
    "Description-7" }
  ];

const isBrowser = typeof window !== `undefined`;

const getScrollPosition = ({ element, useWindow }) => {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow ?
  { x: window.scrollX, y: window.scrollY } :
  { x: position.left, y: position.top };
};

const useScrollPosition = (effect, deps, element, useWindow, wait) => {
  const position = React.useRef(getScrollPosition({ useWindow }));

  let throttleTimeout = null;

  const callBack = () => {
    const currPos = getScrollPosition({ element, useWindow });
    effect({ prevPos: position.current, currPos });
    position.current = currPos;
    throttleTimeout = null;
  };

  React.useLayoutEffect(() => {
    const handleScroll = () => {
      if (wait) {
        if (throttleTimeout === null) {
          throttleTimeout = setTimeout(callBack, wait);
        }
      } else {
        callBack();
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, deps);
};

const EventItem = props => {
  const timeItem = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  const checkElement = el => {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (
      window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth));

  };

  React.useEffect(() => {
    setIsVisible(checkElement(timeItem.current));
  }, []);

  useScrollPosition(({ currPos }) => {
    setIsVisible(checkElement(timeItem.current));
  });
  const { date, content, role, company, location } = props;
  return (
    React.createElement("li", { ref: timeItem, className: isVisible ? "inView" : null }, 
    React.createElement("div", null, 
    React.createElement("time", null,
    date.from, " - ", date.to), 

    React.createElement("h4", { className: "title" }, role), 
    React.createElement("h3", { className: "company" }, company), 
    React.createElement("p", null, 
    React.createElement("i", null, location)), 

    React.createElement("p", { className: "description" }, content))));



};

const Timeline = props => {
  const scrollArea = React.useRef();

  const makeTimeline = events => {
    const evlist = props.events.map(item => {
      return (
        React.createElement(EventItem, {
          date: item.date,
          content: item.content,
          role: item.role,
          company: item.company,
          location: item.location,
          key: `${item.time}` }));

    });
    return React.createElement("ul", null, evlist);
  };

  return (
    React.createElement("div", { className: "wrapper", ref: scrollArea }, 
    React.createElement("section", { className: "header" }, 
    React.createElement("div", { className: "container" }, 
    React.createElement("h1", null, "Atomic Discoveries"), 
    React.createElement("p", null, "Timeline of discoveries though the Atomic Age"))), 

    React.createElement("section", { className: "timeline" }, 
    React.createElement("ul", null, makeTimeline(events)))));
};

ReactDOM.render( 
React.createElement(Timeline, { events: events }),
document.getElementById("react-mount"));