import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";

import "./page.css";

// 第276章节 先完成 pagination 然后去 productListPageComponent 继续完成, 最后去backend里面搞一搞
const PaginationComponent = ({
  categoryName,
  subCategoryName,
  childCategoryName,
  fourCategoryName,
  brandName,
  searchQuery,
  paginationLinksNumber,
  pageNum,
}) => {
  // 如果category name 是the such part of the path，otherwise empty string
  // const category = categoryName ? `category/${categoryName}/` : "";
  // const search = searchQuery ? `search/${searchQuery}/` : "";
  const url = `/product-list?categoryName=${
    categoryName || ""
  }&subCategoryName=${
    subCategoryName || ""
  }&childCategoryName=${childCategoryName}&fourCategoryName=${fourCategoryName}&searchQuery=${searchQuery}&brandName=${brandName}&`;
  // return console.log(pageNum);
  // 如果上个return就不会走下面的了。而且这里是 pagination 这个的 to 不能解析？ query url
  return (
    <>
      {paginationLinksNumber && paginationLinksNumber > 8 ? (
        // 滚去首页，上一页
        <Pagination className="ms-4 mb-1 pagination_productlist">
          <LinkContainer to={`${url}pageNum=1`}>
            <Pagination.First disabled={pageNum === 1} />
          </LinkContainer>
          <LinkContainer to={`${url}pageNum=${pageNum - 1}`}>
            <Pagination.Prev disabled={pageNum === 1} />
          </LinkContainer>
          {/* 小于6页，渲染5个页面，大于等于6个页面，只渲染2个 */}
          {pageNum < 6
            ? [...Array(5).keys()].map((_, index) => (
                <LinkContainer
                  key={index + 1}
                  to={`${url}pageNum=${index + 1}`}
                >
                  <Pagination.Item active={pageNum === index + 1}>
                    {index + 1}
                  </Pagination.Item>
                </LinkContainer>
              ))
            : [
                <LinkContainer key={1} to={`${url}pageNum=1`}>
                  <Pagination.Item active={pageNum === 1}>1</Pagination.Item>
                </LinkContainer>,
                <LinkContainer key={2} to={`${url}pageNum=2`}>
                  <Pagination.Item active={pageNum === 2}>2</Pagination.Item>
                </LinkContainer>,
              ]}
          {/* 大于等于6个页面，渲染 左边...Ellipsis */}
          {pageNum >= 6 && <Pagination.Ellipsis />}
          {/* 大于等于6个页面，并且小于最大页面数-4，渲染 中间3个页面 */}
          {pageNum >= 6 && pageNum < paginationLinksNumber - 4 && (
            <>
              <LinkContainer to={`${url}pageNum=${pageNum - 1}`}>
                <Pagination.Item>{pageNum - 1}</Pagination.Item>
              </LinkContainer>
              <LinkContainer to={`${url}pageNum=${pageNum}`}>
                <Pagination.Item active>{pageNum}</Pagination.Item>
              </LinkContainer>
              <LinkContainer to={`${url}pageNum=${pageNum + 1}`}>
                <Pagination.Item>{pageNum + 1}</Pagination.Item>
              </LinkContainer>
            </>
          )}

          {/* 小于最大页面数-4，渲染 右边...Ellipsis */}
          {pageNum < paginationLinksNumber - 4 && <Pagination.Ellipsis />}
          {/* 小于最大页面数-4，渲染5个页面，反之渲染2个 */}
          {pageNum >= paginationLinksNumber - 4
            ? [
                paginationLinksNumber - 4,
                paginationLinksNumber - 3,
                paginationLinksNumber - 2,
                paginationLinksNumber - 1,
                paginationLinksNumber,
              ].map((page) => (
                <LinkContainer key={page} to={`${url}pageNum=${page}`}>
                  <Pagination.Item active={pageNum === page}>
                    {page}
                  </Pagination.Item>
                </LinkContainer>
              ))
            : [paginationLinksNumber - 1, paginationLinksNumber].map((page) => (
                <LinkContainer key={page} to={`${url}pageNum=${page}`}>
                  <Pagination.Item active={pageNum === page}>
                    {page}
                  </Pagination.Item>
                </LinkContainer>
              ))}

          {/* 后一页， 滚去尾页 */}
          <LinkContainer to={`${url}pageNum=${pageNum + 1}`}>
            <Pagination.Next disabled={pageNum === paginationLinksNumber} />
          </LinkContainer>
          <LinkContainer to={`${url}pageNum=${paginationLinksNumber}`}>
            <Pagination.Last disabled={pageNum === paginationLinksNumber} />
          </LinkContainer>
        </Pagination>
      ) : (
        <Pagination className="ms-4 mb-1 pagination_productlist">
          <LinkContainer to={`${url}pageNum=1`}>
            <Pagination.First disabled={pageNum === 1} />
          </LinkContainer>
          <LinkContainer to={`${url}pageNum=${pageNum - 1}`}>
            <Pagination.Prev disabled={pageNum === 1} />
          </LinkContainer>
          {[...Array(paginationLinksNumber).keys()].map((x) => (
            <LinkContainer key={x + 1} to={`${url}pageNum=${x + 1}`}>
              <Pagination.Item active={x + 1 === pageNum}>
                {x + 1}
              </Pagination.Item>
            </LinkContainer>
          ))}
          <LinkContainer to={`${url}pageNum=${pageNum + 1}`}>
            <Pagination.Next disabled={pageNum === paginationLinksNumber} />
          </LinkContainer>
          <LinkContainer to={`${url}pageNum=${paginationLinksNumber}`}>
            <Pagination.Last disabled={pageNum === paginationLinksNumber} />
          </LinkContainer>
        </Pagination>
      )}
    </>
  );
};

export default PaginationComponent;
