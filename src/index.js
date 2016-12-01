/* eslint strict: ["error", "global"] */


class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className={this.props.name}>
			<Child/>
			</div>
    );
  }
}
