import React, { useState, useEffect, useRef, useCallback } from "react";

import "./question-list.styles.scss";
import Table from "react-bootstrap/Table";

import { ApiService } from "../../services/api.service";
import { Question } from "../../types/question";
import { CommonModal } from "../modal/modal.component";
import parse from "html-react-parser";

const QuestionListComponent: React.FC = () => {
  const [questionList, setQuestionList] = useState<Array<Question>>([]);
  const [pageNumber, setPageNumer] = useState<number>(1);
  const apiService: ApiService = new ApiService();
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observer = useRef<IntersectionObserver>();
  const lastQuesElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current?.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
            incrementPageNumber();
           setIsLoading(true);

        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    apiService.getQuestionList(pageNumber).then((response) => {
      let questionList = response.data.items.map((ques) => {
        ques.displayDate = new Date(ques.creation_date * 1000).toDateString();
        return ques;
      });
      setQuestionList((prevList) => prevList.concat(questionList));
      setHasMore(response.data.has_more);
      setIsLoading(false);
    });
  }, [pageNumber]);

  function incrementPageNumber() {
    setPageNumer((prevNumber) => prevNumber + 1);
  }

  let modal = (question: Question) => {
    return (
      <span onClick={(e) => e.stopPropagation()}>
        <CommonModal
          show={modalStatus && question.showDetails}
          onHide={() => {
            question.showDetails = false;
            setModalStatus(question.showDetails);
          }}
          heading={
            <div className="d-flex w-100 justify-content-between">
              <span>{question.title}</span>
            </div>
          }
          size="lg"
          dialogClassName="modal-size"
          footer={
            <React.Fragment>
              <b>Link to Page : </b>
              <a href={question.link}>{question.link}</a>
            </React.Fragment>
          }
        >
          {parse(question.body)}
        </CommonModal>
      </span>
    );
  };

  return (
    <div className="question-list-wrapper">
      <h3 className="mb-4 text-center">Question Board</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>AUTHOR</th>
            <th>TITLE</th>
            <th>CREATION DATE</th>
          </tr>
        </thead>
        <tbody>
          {questionList?.map((question, index) => {
            if (questionList.length === index + 1)
              return (
                <tr
                  className="question-row"
                  ref={lastQuesElementRef}
                  key={`${question.question_id}${index}`}
                  onClick={() => {
                    question.showDetails = true;
                    setModalStatus(true);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{question.owner?.display_name}</td>
                  <td>{question.title}</td>
                  <td>{question.displayDate}</td>
                  {modal(question)}
                </tr>
              );
            else
              return (
                <tr
                  className="question-row"
                  key={`${question.question_id}${index}`}
                  onClick={() => {
                    question.showDetails = true;
                    setModalStatus(true);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{question.owner?.display_name}</td>
                  <td>{question.title}</td>
                  <td>{question.displayDate}</td>
                  {modal(question)}
                </tr>
              );
          })}
        </tbody>
      </Table>
      {isLoading && (
        <div className="w-100 d-flex">
          <span className="mx-auto">
            <b>Loading...</b>
          </span>
        </div>
      )}
      {!hasMore && (
        <div className="mt-2 d-flex">
          <span className="mx-auto">
            <b>Yay! You have reached the finish line</b>
          </span>
        </div>
      )}
    </div>
  );
};

export default QuestionListComponent;
