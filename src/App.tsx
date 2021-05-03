import React from 'react';
import './App.css';
import './styles/main.scss'
import QuestionListPage from './pages/question-list-page.component/question-list-page.component';

const App:React.FC = () => {
  return (
    <div className="mini-tech">
      <QuestionListPage></QuestionListPage>
    </div>
  );
}

export default App;
