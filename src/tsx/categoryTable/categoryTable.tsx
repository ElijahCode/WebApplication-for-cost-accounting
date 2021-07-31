import React, { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { categoryCreator } from "../../ts/categoryCreator/categoryCreator";
import {
  addCategory,
  changeCategoryName,
  deleteCategory,
} from "../../ts/reducer/actions";

interface ICategoryTableState {
  categories: IStateCategory[];
  isChangeCategoryNameButtonClicked: boolean;
  changedCategoryID: string;
}

class CategoryTableWithoutConnect extends React.Component<
  any,
  ICategoryTableState
> {
  state = {
    categories: this.props.categoriesOfCost,
    isChangeCategoryNameButtonClicked: false,
    changedCategoryID: "",
  };

  addCategoryButtonClick = (event: any): void => {
    const closestDiv: HTMLDivElement = event.target.closest("div");
    if (closestDiv.matches(".category_Item_SubBlock")) {
      const categoryID = event.target.closest("div").id;
      (
        document.querySelector(".addCategory_ParentInput") as HTMLInputElement
      ).value = this.state.categories.find(
        (category: IStateCategory) => category.id === categoryID
      ).name;
    }
    if (closestDiv.matches(".addCategory_Block")) {
      const categoryName = (
        document.querySelector(".addCategory_NameInput") as HTMLInputElement
      ).value;
      const parentName = (
        document.querySelector(".addCategory_ParentInput") as HTMLInputElement
      ).value;
      const category = categoryCreator(categoryName);
      if (parentName !== "") {
        const parentCategory = this.state.categories.find(
          (categ: IStateCategory) => categ.name === parentName
        );
        category.parentID = parentCategory.id;
      }
      this.props.addCategory(category);
      if (parentName !== "") {
        const parentCategory = this.state.categories.find(
          (categ: IStateCategory) => categ.name === parentName
        );
        parentCategory.childs += `${category.id} `;
      }
      const newCategories = [...this.state.categories, category];
      this.setState({
        categories: newCategories,
      });
      (
        document.querySelector(".addCategory_NameInput") as HTMLInputElement
      ).value = "";
      (
        document.querySelector(".addCategory_ParentInput") as HTMLInputElement
      ).value = "";
    }
  };

  changeCategoryNameButtonClick = (event: any): void => {
    const categoryID = event.target.closest("div").id;
    this.setState({
      isChangeCategoryNameButtonClicked: true,
      changedCategoryID: categoryID,
    });
  };

  changeCategoryNameMainButtonClick = (): void => {
    const newName = (
      document.querySelector(".changeCategory_nameInput") as HTMLInputElement
    ).value;
    const changedCategory = {
      ...this.state.categories.find(
        (category: IStateCategory) =>
          category.id === this.state.changedCategoryID
      ),
    };
    this.props.changeCategoryName({
      newName,
      category: changedCategory,
    });
    changedCategory.name = newName;
    const newCategories = this.state.categories.filter(
      (category: IStateCategory) => category.id !== changedCategory.id
    );
    newCategories.push(changedCategory);
    this.setState({
      categories: newCategories,
      isChangeCategoryNameButtonClicked: false,
    });
    (
      document.querySelector(".changeCategory_nameInput") as HTMLInputElement
    ).value = "";
  };

  renderChildCategories(
    parentCategory: IStateCategory,
    ...parentsIndex: number[]
  ): JSX.Element {
    const childs = this.state.categories.filter(
      (category: IStateCategory) => parentCategory.id === category.parentID
    ) as IStateCategory[];
    const layout = (
      <>
        {childs.map((child, index) => (
          <div key={child.id}>
            <div
              className={"category_Item_SubBlock"}
              id={child.id}
              data-testid="categoryItemSubBlock"
            >
              <p>
                {parentsIndex.join(".")}.{index + 1}
              </p>
              <p>Total cost:{child.cost}</p>
              <button
                onClick={this.addCategoryButtonClick}
                data-testid="AddSubCategoryButton"
              >
                Add subcategory
              </button>
              <button
                onClick={this.changeCategoryNameButtonClick}
                data-testid="ChangeCategoryNameButton"
              >
                Chage category name
              </button>
              <button>Delete Category</button>
            </div>
            {child.childs === ""
              ? null
              : this.renderChildCategories(child, ...parentsIndex, index + 1)}
          </div>
        ))}
      </>
    );
    return layout;
  }

  render(): JSX.Element {
    const rootCategories = this.state.categories.filter(
      (category: IStateCategory) => category.parentID === null
    );
    const layout = (
      <div data-testid="CategoryTableBlock">
        <div className={"addCategory_Block"} data-testid="AddCategoryBlock">
          <p>Category name</p>
          <input
            type="text"
            className={`addCategory_NameInput`}
            data-testid="addCategoryNameInput"
          />
          <p>Parent category</p>
          <input
            type="text"
            className={`addCategory_ParentInput`}
            data-testid="addCategoryParentInput"
          />
          <button
            onClick={this.addCategoryButtonClick}
            data-testid="addCategoryButton"
          >
            Add category
          </button>
        </div>
        {this.state.isChangeCategoryNameButtonClicked && (
          <div data-testid="ChangeCategoryNameBlock">
            <p>Enter new category name:</p>
            <input
              type="text"
              className={"changeCategory_nameInput"}
              data-testid="ChangeCategoryNameInput"
            />
            <button
              onClick={this.changeCategoryNameMainButtonClick}
              data-testid="ChangeCategoryNameMainButton"
            >
              Change name
            </button>
          </div>
        )}
        <div data-testid="CategoriesBlock">
          {rootCategories.map((category: IStateCategory, index: number) => (
            <div key={category.id}>
              <div
                className={"category_Item_SubBlock"}
                id={category.id}
                data-testid="categoryItemSubBlock"
              >
                <p>{index + 1}</p>
                <p>Total cost:{category.cost}</p>
                <button
                  onClick={this.addCategoryButtonClick}
                  data-testid="AddSubCategoryButton"
                >
                  Add subcategory
                </button>
                <button
                  onClick={this.changeCategoryNameButtonClick}
                  data-testid="ChangeCategoryNameButton"
                >
                  Chage category name
                </button>
                <button>Delete Category</button>
              </div>
              {category.childs === ""
                ? null
                : this.renderChildCategories(category, index + 1)}
            </div>
          ))}
        </div>
      </div>
    );
    return layout;
  }
}

const mapStateToProps = (state: IState) => ({
  categoriesOfCost: state.categoriesOfCost,
});
const mapDispatchToProps = {
  addCategory,
  changeCategoryName,
  deleteCategory,
};

export const CategoryTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryTableWithoutConnect);
