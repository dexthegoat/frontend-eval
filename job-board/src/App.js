import { useState, useEffect } from 'react';
import './App.css';

const url1 = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
const url2 = 'https://hacker-news.firebaseio.com/v0/item';

const dateFormatter = (dt) =>
  new Intl.DateTimeFormat('en-US').format(new Date(dt));

function App() {
  const [jobIds, setJobIds] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [jump, setJump] = useState(3);

  useEffect(() => {
    fetch(url1)
      .then((res) => res.json())
      .then((ids) => setJobIds(ids));
  }, []);

  useEffect(() => {
    let startIdx = jump === 3 ? 0 : jump;
    const ids = jobIds.slice(startIdx, jump + 6);
    ids.forEach((id) => {
      fetch(`${url2}/${id}.json`)
        .then((res) => res.json())
        .then((data) => setJobDetails((prev) => [...prev, data]));
    });
  }, [jobIds, jump]);

  const handleLoadMore = () => {
    setJump((prev) => (prev === jobIds.length ? prev : prev + 6));
  };

  return (
    <div className="App">
      <h1>HN Jobs</h1>
      <div className="container">
        {jobDetails.map((job, idx) => {
          let splitedTitles = job.title.split(' ');
          let yc = '';
          if (splitedTitles[1].startsWith('(YC')) {
            yc = splitedTitles[1] + splitedTitles[2];
          }
          return (
            <div className="card" key={`${job}-${idx}`}>
              <a href={job.url} target="blank">
                <div className="title">
                  {splitedTitles[0]} &nbsp; {yc}
                </div>
                <div className="body">
                  {splitedTitles[1].startsWith('(YC')
                    ? splitedTitles.slice(3).join(' ')
                    : splitedTitles.slice(1).join(' ')}
                </div>
                <div className="footer">{dateFormatter(job.time)}</div>
              </a>
            </div>
          );
        })}
      </div>
      {jump <= jobIds.length && (
        <div className="button-wrapper">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default App;
