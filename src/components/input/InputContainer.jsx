import { useEffect, useState, forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEyeSlash,
  faEye,
  faClipboard,
  faClose,
  faImage,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import moment from "moment";
import { DatePicker, Switch, Radio, Checkbox, Button } from "antd";
import dayjs from "dayjs";
// import axios from '../../axios/index';
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { Editor } from "@tinymce/tinymce-react";

const { Dragger } = Upload;

import "./InputContainer.scss";
// import { ShowMessage } from "../Utils";

const InputContainer = forwardRef(
  (
    {
      name,
      value,
      placeholder,
      id,
      className,
      type,
      label,
      labelClassName,
      error,
      onChange,
      onKeyDown,
      options,
      optionsLabelKey,
      optionsValueKey,
      required,
      labelAlign,
      optionsUrl,
      optionsParam,
      disabled,
      readOnly,
      containerClassName,
      tableInline,
      onKeyUp,
      min,
      step,
      autoFocus,
      isMulti,
      style,
      BeforeOnKeyDown,
      isClearable,
      AfterOnKeyDown,
      format,
      picker,
      menuPlacement,
      onBlur,
      checkedChildren,
      unCheckedChildren,
      defaultChecked,
      showClipboard,
      subtext,
      inputClassName,
      disabledDate,
    },
    ref
  ) => {
    const [optionsFromUrl, setOptionsFromUrl] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedValue, setSelectedValue] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);

    const uploadProps = {
      name: "file",
      multiple: false,
      disabled: disabled,
      showUploadList: false,
      accept: "image/png,image/gif,image/jpeg",
      onChange(info) {
        onChange(info.file.originFileObj);
      },
      onDrop(e) {
        onChange(e.dataTransfer.files[0]);
      },
    };

    const findNextTabStop = (el) => {
      const universe = document.querySelectorAll(
        "input:not([disabled]), button, select, textarea, a[href]"
      );
      const list = Array.prototype.filter.call(
        universe,
        (item) => item.tabIndex >= "0"
      );
      const index = list.indexOf(el);
      return list[index + 1] || list[0];
    };

    const findPreviousTabStop = (el) => {
      const universe = document.querySelectorAll(
        "input:enabled:not([id='overallmonth']), button, select, textarea, a[href]"
      );
      const list = Array.prototype.filter.call(
        universe,
        (item) => item.tabIndex >= "0"
      );
      const index = list.indexOf(el);
      return list[index - 1] || list[0];
    };

    const findSelectNextTabStop = () => {
      const element = document.querySelector(`[aria-labelledby="${id}"]`);
      const universe = document.querySelectorAll(
        "input:enabled:not([id='overallmonth']), button, select, textarea, a[href]"
      );

      const list = Array.prototype.filter.call(
        universe,
        (item) => item.tabIndex >= "0"
      );
      const index = list.indexOf(element);
      return list[index + 1] || list[0];
    };

    const onChangeSelect = async (e) => {
      if (BeforeOnKeyDown) {
        await BeforeOnKeyDown(e);
      }
      await onChange(e);
      if (AfterOnKeyDown) {
        await AfterOnKeyDown(e);
      }
      const element = findSelectNextTabStop();
      element.focus();
    };

    const onChangeInput = (e) => {
      // let event = e;
      // let regex = /[^A-Za-z0-9,@./-\s]/gi;
      // event.target.value = e.target.value.replace(regex, "");
      // eslint-disable-next-line no-restricted-globals
      onChange(event);
    };

    const onDateChange = (date, dateString) => {
      const response = {};
      response.target = {
        name,
        value: dateString,
      };
      onChange(response);
      setShowDatePicker(false);
    };

    const RichTextChangeHandler = (newValue) => {
      const response = {};
      response.target = {
        name,
        value: newValue,
      };
      onChange(response);
    };

    const handleEnter = async (event) => {
      if (BeforeOnKeyDown) {
        await BeforeOnKeyDown(event);
      }
      const selection = document.getSelection();
      if (
        (selection.type.toLowerCase() === "range" ||
          event.target.value.length === 0) &&
        event.key.toLowerCase() === "backspace"
      ) {
        const element = findPreviousTabStop(event.target);
        element.focus();
        if (
          element.type &&
          element.type !== "button" &&
          element.type !== "submit"
        ) {
          element.select();
        }
        event.preventDefault();
      }

      if (
        (type !== "select" ||
          (type === "select" && event.target.ariaExpanded === "false")) &&
        event.key.toLowerCase() === "enter"
      ) {
        const element = findNextTabStop(event.target);
        element.focus();
        if (
          element.type &&
          element.type !== "button" &&
          element.type !== "submit"
        ) {
          element.select();
        }
        event.preventDefault();
      }

      if (
        type === "date" &&
        (event.key.toLowerCase() === "enter" ||
          (event.target.value.length === 0 &&
            event.key.toLowerCase() === "backspace"))
      ) {
        setShowDatePicker(false);
      }

      if (
        type === "date" &&
        !(event.key.toLowerCase() === "enter") &&
        !(event.key.toLowerCase() === "backspace")
      ) {
        setShowDatePicker(true);
      }

      if (type !== "select" && type !== "button" && onKeyDown) {
        onKeyDown(event);
      }
    };

    const selectValue = () => {
      const selectOptions =
        optionsFromUrl.length > 0 ? optionsFromUrl : options;
      if (value && isMulti) {
        return selectOptions?.filter((obj) => {
          if (value.includes(obj[optionsValueKey])) {
            return obj;
          }
          return null;
        });
      }

      if (value) {
        return selectOptions?.find(
          (option) => option[optionsValueKey] === value
        );
      }

      return null;
    };

    useEffect(() => {
      if (type === "select") {
        setSelectedValue(selectValue());
      }
    }, [value, type, optionsFromUrl, options]);

    const SelectLabelRender = (option, label) => {
      const labelArray = label?.split(",");
      let optionLabel = "";
      labelArray?.map((labl, index) => {
        optionLabel = `${optionLabel} ${
          index === 0 ? `${option[labl]}` : ` - ${option[labl]}`
        }`;
        return optionLabel;
      });
      return optionLabel;
    };

    const ChangePasswordPreviewHandler = () => {
      setPasswordVisible(!passwordVisible);
    };

    const RemovePreviewHandler = () => {
      onChange(null);
    };

    return (
      <div
        className={`input-container mb-2 ${
          labelAlign === "left" ? "d-flex flex-row m-5-0" : ""
        } ${containerClassName || ""} ${type === "toggle" ? "w-150-px" : ""}`}
      >
        {label && (
          <div
            className={`${!tableInline && "mt-1"} ${
              labelAlign === "left" ? "col-4 col-sm-4 col-md-4" : "col-md-12"
            }`}
          >
            <label
              htmlFor={id}
              className={`form-label ${labelClassName || ""}`}
            >
              {label}
              {required && <span className="required">*</span>}
            </label>
          </div>
        )}
        <div
          className={`mt-1 field-container ${
            labelAlign === "left" ? "col-8 col-sm-8 col-md-8" : "col-md-12"
          } ${type === "password" ? "position-relative" : ""} ${
            inputClassName || null
          }`}
        >
          {(type === "text" || type === "number" || type === "email") && (
            <span className="d-flex align-items-center">
              <input
                type={type}
                className={`${className || ""} ${
                  error && error.length > 0 ? "error-border" : ""
                }  w-full form-control p-2 placeholder-[#b6b6b6]`}
                id={id}
                name={name}
                value={value || ""}
                onChange={onChange ? onChangeInput : () => {}}
                onBlur={onBlur}
                ref={ref}
                onKeyDown={handleEnter}
                onKeyUp={onKeyUp}
                placeholder={!disabled ? placeholder : ""}
                disabled={disabled}
                readOnly={readOnly}
                min={min}
                step={step}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                style={style}
                autoComplete="new-password"
              />
            </span>
          )}
          {type === "password" && (
            <span className="d-flex align-items-center">
              <input
                type={passwordVisible ? "text" : "password"}
                className={`form-control ${className || ""} ${
                  error && error.length > 0 ? "error-border" : ""
                } ${tableInline ? "no-border" : ""}`}
                id={id}
                name={name}
                value={value || ""}
                onChange={onChange ? onChangeInput : () => {}}
                onBlur={onBlur}
                ref={ref}
                onKeyDown={handleEnter}
                onKeyUp={onKeyUp}
                placeholder={!disabled ? placeholder : ""}
                disabled={disabled}
                readOnly={readOnly}
                min={min}
                step={step}
                // eslint-disable-next-line jsx-a11y/no-autofocus
                autoFocus={autoFocus}
                style={style}
                autoComplete="new-password"
              />
              {showClipboard ? (
                <FontAwesomeIcon
                  icon={faClipboard}
                  className="clipboard-view right-35-px"
                  onClick={CopyToClipboardHandler}
                />
              ) : (
                <></>
              )}
              <FontAwesomeIcon
                icon={passwordVisible ? faEyeSlash : faEye}
                className="password-view"
                onClick={ChangePasswordPreviewHandler}
              />
            </span>
          )}
          {type === "date" && (
            <DatePicker
              picker={picker || undefined}
              className={`form-control ${
                error && error.length > 0 ? "error-border" : ""
              }  ${tableInline ? "no-border" : ""}`}
              id={id}
              name={name}
              onChange={onDateChange}
              onClick={() => {
                setShowDatePicker(true);
              }}
              onFocus={() => {
                setShowDatePicker(true);
              }}
              onBlur={() => {
                setShowDatePicker(false);
              }}
              onKeyDown={handleEnter}
              open={showDatePicker}
              ref={ref}
              placeholder={!disabled ? placeholder : ""}
              popupClassName="picker-dropdown-classname"
              format={"DD/MM/YYYY"}
              value={
                !value || moment(value, "DD/MM/YYYY") === "Invalid date"
                  ? undefined
                  : dayjs(
                      moment(
                        value.length > 10
                          ? moment(value.remainderDate).format("DD/MM/YYYY")
                          : value,
                        "DD/MM/YYYY"
                      )
                    )
              }
              disabled={disabled}
              disabledDate={disabledDate}
              readOnly={readOnly}
              allowClear={false}
            />
          )}
          {type === "select" && (
            <Select
              isMulti={isMulti}
              className={`select-input ${className} ${
                error && error.length > 0 ? "error-border" : null
              } ${tableInline ? "no-border" : ""}`}
              value={selectedValue}
              onChange={(e) => onChangeSelect(e)}
              placeholder={!disabled ? placeholder : ""}
              aria-labelledby={id}
              options={optionsUrl ? optionsFromUrl : options}
              ref={ref}
              onKeyDown={handleEnter}
              form={name}
              closeMenuOnSelect
              getOptionLabel={(option) =>
                SelectLabelRender(option, optionsLabelKey)
              }
              getOptionValue={(option) => option[optionsValueKey]}
              isDisabled={disabled}
              readOnly={readOnly}
              onKeyUp={onKeyUp}
              isClearable={isClearable}
              styles={customStyles}
              menuPosition="absolute"
              menuPlacement={menuPlacement || "auto"}
              menuPortalTarget={document.body}
              id={id}
            />
          )}
          {type === "textarea" && (
            <textarea
              type={type}
              className="w-full p-2 border border-stone-500 rounded-md"
              id={id}
              name={name}
              value={value || ""}
              onChange={onChange ? onChangeInput : () => {}}
              onBlur={onBlur}
              ref={ref}
              onKeyDown={handleEnter}
              placeholder={!disabled ? placeholder : ""}
              disabled={disabled}
              readOnly={readOnly}
              min={min}
              step={step}
              style={style}
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus={autoFocus}
            />
          )}
          {type === "toggle" && (
            <Switch
              checkedChildren={checkedChildren}
              unCheckedChildren={unCheckedChildren}
              defaultChecked={defaultChecked}
              checked={Boolean(value)}
              className={`toggle form-control ${className || ""} ${
                error && error.length > 0 ? "error-border" : ""
              } ${tableInline ? "no-border" : ""}`}
              onChange={onChange}
              disabled={disabled}
            />
          )}
          {type === "radio" && (
            <Radio.Group
              onChange={onChange}
              value={value}
              name={name}
              disabled={disabled}
            >
              {options.map((option) => (
                <Radio key={option.value} name={name} value={option.value}>
                  {option.label}
                </Radio>
              ))}
            </Radio.Group>
          )}
          {type === "checkbox" && (
            <Checkbox
              onChange={onChange}
              value={value}
              name={name}
              disabled={disabled}
            >
              {label}
            </Checkbox>
          )}
          {type === "richtext" && (
            <Editor
              apiKey={import.meta.env.VITE_TINY_MCE}
              disabled={disabled}
              onEditorChange={(newValue, editor) =>
                RichTextChangeHandler(newValue)
              }
              value={value}
              init={{
                height: 200,
                menubar: false,
                statusbar: false,
                plugins: disabled
                  ? []
                  : [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "charmap",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "code",
                      "fullscreen",
                      "insertdatetime",
                      "media",
                      "table",
                      "code",
                      "help",
                      "wordcount",
                    ],
                toolbar: disabled
                  ? ""
                  : "undo redo | blocks | " +
                    "bold italic forecolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
              }}
            />
          )}
          {type === "image" && (
            <>
              {value ? (
                <div className="relative">
                  {disabled ? (
                    <></>
                  ) : (
                    <Button
                      type="primary"
                      danger
                      className="preview-remove mt-2"
                      onClick={RemovePreviewHandler}
                    >
                      <FontAwesomeIcon icon={faTrash} className="" />
                    </Button>
                  )}
                  <picture>
                    <img
                      src={
                        value && value?.url
                          ? value?.url
                          : URL.createObjectURL(value)
                      }
                      alt="Itinery"
                      className="w-100 preview-image"
                    />
                  </picture>
                </div>
              ) : (
                <Dragger {...uploadProps}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">
                    Upload a file or drag and drop PNG, JPG, GIF up to 1MB
                  </p>
                </Dragger>
              )}
            </>
          )}
          <span className="error-statement">{error}</span>
          {subtext ? <span className="subtext">{subtext}</span> : <></>}
        </div>
      </div>
    );
  }
);

export default InputContainer;

const customStyles = {
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: "#d9d9d9",
    borderRadius: "5px",
  }),
  placeholder: (provided, state) => ({
    ...provided,
    color: "#b6b6b6",
    fontSize: "0.85rem",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#212529",
    fontSize: "0.85rem",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
    ...styles,
    fontSize: "0.85rem",
    color: isSelected ? "white" : "black",
    backgroudColor: isFocused || isSelected ? "#40a9ff" : "white",
  }),
};
