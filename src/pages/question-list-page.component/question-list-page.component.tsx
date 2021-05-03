import React from 'react';
import QuestionListComponent from '../../components/question-list/question-list.component';

import './question-list-page.styles.scss';

const QuestionListPage: React.FC = () => {
    return (
        <div className="question-list-page">
        <QuestionListComponent></QuestionListComponent>
        </div>
    );
}

export default QuestionListPage;