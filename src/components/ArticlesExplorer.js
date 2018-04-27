import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container,
  Row,
  Col,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
  FormGroup,
  Label,
  Form,
  FormFeedback,
  Alert
} from 'reactstrap';
import golos from 'golos-js';

class ArticlesView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const articles = this.props.articles;
    const preparedArticles = articles ? articles.map(a => <Row>{a.body}</Row>) : <Row>Article not found</Row>;
    return (
      <Container>
        {preparedArticles}
      </Container>
    );
  }
}

class ArticlesSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        authors: '',
        tags: '',
      }
    };

    this.handleChangeAuthors = this.handleChangeAuthors.bind(this);
    this.handleChangeTags = this.handleChangeTags.bind(this);
    this.getArticles = this.getArticles.bind(this);
    this.getArticlesByAuthorsAndTags = this.getArticlesByAuthorsAndTags.bind(this);
    this.getArticlesByTags = this.getArticlesByTags.bind(this);
  }

  handleChangeAuthors(e) {
    const oldTags = this.state.search.tags.slice();
    this.setState({
      search: {
        authors: e.target.value,
        tags: oldTags,
      }
    })
  }

  handleChangeTags(e) {
    const oldAuthors = this.state.search.authors.slice();
    this.setState({
      search: {
        authors: oldAuthors,
        tags: e.target.value,
      }
    })
  }

  async getArticlesByTags(query) {
    let found;
    try {
      found = await golos.api.getDiscussionsByTrending(query);
      console.log("! found articles from getArticlesByTags: ", found, "with query: ", query);            
    } catch(e) {
      console.error('error from getArticlesByTags: ', e);
    }
    return found;
  }

  async getArticlesByAuthorsAndTags(query) {
    let found;
    try {
      found = await golos.api.getDiscussionsByBlog(query);
      console.log("! found articles from getArticlesByAuthorsAndTags: ", found, "with query: ", query);      
    } catch (e) {
      console.error('error from getArticlesByAuthorsAndTags: ', e);      
    }
    return found;
  }

  async getArticles() {
    const authors = this.state.search.authors.split(",").map(a => a.trim());
    const tags = this.state.search.tags.split(",").map(t => t.trim());

    const q = {
      limit: 100
    };

    const isSeachByAuthorsAndTags = authors.length > 0 && authors[0] !== '';
    if (isSeachByAuthorsAndTags) {
      const query = {
        ...q,
        select_authors: authors,
        select_tags: tags,
      };
      const found = await this.getArticlesByAuthorsAndTags(query);
      this.props.sendFoundArticles(found);
    } else {
      const query = {
        ...q,
        select_tags: tags,
      };
      const found = await this.getArticlesByTags(query);
      this.props.sendFoundArticles(found);
    }
  }

  render() {
    return (
      <Container>
         <Form onSubmit={ this.getArticles }>
            <FormGroup>
              <Input
                type="text"
                placeholder="author1, author2, ..."
                value={ this.state.authors }
                onChange={ this.handleChangeAuthors }
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="text"
                placeholder="tag1, tag2, tag3, ..."
                value={ this.state.tags }
                onChange={ this.handleChangeTags }
              />
            </FormGroup>

            <Container>
              <Row className="justify-content-center">
                <Col sm='auto'>
                  <Button
                    color="primary"
                    onClick={ this.getArticles }
                  >
                    Get articles
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
      </Container>
    );
  }
}


export default class ArticleExplorer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      foundArticles: [],
    }

    this.handleFoundArticles = this.handleFoundArticles.bind(this);
  }

  handleFoundArticles(found) {
    // console.log("FOUND ARTICLES: ", found);
    this.setState({
      foundArticles: found,
    });
  }

  render() {
    return(
      <Container>
        <Row>
          <ArticlesSearch sendFoundArticles={this.handleFoundArticles} />
        </Row>
        <Row>
          <ArticlesView articles={this.state.foundArticles}/>
        </Row>
      </Container>
    );
  }

}