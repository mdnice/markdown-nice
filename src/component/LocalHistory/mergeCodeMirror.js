import CodeMirror from "codemirror";
import diff from "diff_match_patch";
import "codemirror/mode/meta";
import "codemirror/addon/merge/merge";
import "codemirror/addon/merge/merge.css";
import React, {Component} from "react";
import PropTypes from "prop-types";

Object.keys(diff).forEach((key) => {
  window[key] = diff[key];
});
export default class MergeCodeMirror extends Component {
  constructor(props) {
    super(props);
    this.codemirror = null;
    this.editor = null;
  }

  componentDidMount() {
    this.renderCodeMirror();
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const val = this.editor.edit.getValue();
    const next = nextProps.options.value;
    if (next !== undefined && next !== this.props.options.value && next !== val) {
      this.editor.edit.setValue(nextProps.options.value);
    }
    const {options} = nextProps;
    await this.setOptions(options);
  }

  componentWillUnmount() {
    if (this.editor) {
      // this.editor.destory();
    }
  }

  // http://codemirror.net/doc/manual.html#config
  async setOptions(options) {
    if (typeof options === "object") {
      const mode = CodeMirror.findModeByName(options.mode);
      if (mode && mode.mode) {
        require(`codemirror/mode/${mode.mode}/${mode.mode}.js`);
      }
      if (mode) {
        options.mode = mode.mime;
      }
      Object.keys(options).forEach((name) => {
        if (options[name] && JSON.stringify(options[name])) {
          this.editor.edit.setOption(name, options[name]);
        }
      });
    }
  }

  renderCodeMirror() {
    // 生成codemirror实例
    this.editor = CodeMirror.MergeView(this.view, this.props.options);
    // 获取CodeMirror用于获取其中的一些常量
    this.codemirror = CodeMirror;
    // 初始化值
    const {value} = this.props.options;
    this.editor.edit.setValue(value || "");
  }

  render() {
    return (
      <div
        className={this.props.className}
        ref={(instance) => {
          this.view = instance;
        }}
      />
    );
  }
}

MergeCodeMirror.defaultProps = {
  options: {},
  className: "",
};

MergeCodeMirror.propTypes = {
  options: PropTypes.object,
  className: PropTypes.string,
};
