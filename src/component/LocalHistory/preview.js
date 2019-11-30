import * as React from "react";
import {Modal} from "antd";
// import MarkDownPreview from '@component/MarkdownPreview';

const MarkDownPreview = (props) => <div>{props.markDownString}</div>;
class PreviewForm extends React.PureComponent {
  render() {
    const {visible, hideModal, markDownString} = this.props;
    return (
      <Modal
        title="预览"
        visible={visible}
        onCancel={hideModal}
        onOk={hideModal}
        width={600}
        destroyOnClose
        closable
        centered
        footer={null}
      >
        <MarkDownPreview markDownString={markDownString} />
      </Modal>
    );
  }
}

PreviewForm.defaultProps = {
  visible: false,
  hideModal: () => {},
  markDownString: "",
};
export default PreviewForm;
