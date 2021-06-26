import React, { ReactElement } from "react";
import { createGlobalStyle } from "styled-components";

const ResetStyle = createGlobalStyle`
  body {
    position: static;
    margin:0;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  body * {
    font-family: Avenir, -apple-system, BlinkMacSystemFont, Roboto, HelveticaNeue, Helvetica, Arial, sans-serif;
    box-sizing: border-box;
  }
  img {
    border:0; /* kills Gecko bug when img's are placed inside links */
    vertical-align:bottom; /* set vertical align to bottom for IE */
    user-drag: none; 
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    width:100%;
    height:auto;    
  }
  a,
  a:link,
  a:visited,
  a:focus,
  a:hover,
  a:active {
    color: #fff;
    text-decoration: none;
    outline:0;
  }
  #nav a {
    text-decoration:none;
  }
  #wrap {
    margin:0 auto; /* centers layout */
    min-height:100%; /* height 100% in all modern browsers */
  }
  #left {
    float:left;
  }
  #foot {
    clear:both;
  }
`;

const ResetFormStyle = createGlobalStyle`
  fieldset {
    border:none;
  }
  form :focus {
    outline:0; /* removes Safari's blue border */
  }  
  input, select, textarea {
    font-size:1em;
  }
  label {
    cursor:pointer;
    vertical-align:middle;
    color:#fff;
  }
  input {
    vertical-align:middle;
    color:#fff;
  }
  svg > rect{
    fill: transparent;
  }
  textarea { 
    // overflow:auto; /* removes scrollbar from IE when none is needed */
  }  
`;

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, h6, p {
    text-align: center;
    margin:0 0 0.5em;
  }
  p, ul, ol {
    font-size:1em;
    word-break: break-all;
    text-align: left;
  }
  ul {
    // margin:0 0 1em 25px;
    margin-top:0px;
    list-style:none;
    text-align:left;
    padding:0;
  }
  h1 {font-size:2em;}
  h2 {font-size:1.5em;}
  h3 {font-size:1.4em;}
  h4 {font-size:1.3em;}
  h5 {font-size:1.2em;}
  h6 {font-size:1.1em;}
  .clear {
    clear:both;
    line-height:0;
    height:0;
    font-size:0;
  }
  .clearfix:after {
    content:" "; 
    display:block; 
    height:0;
    font-size:0; 
    clear:both; 
    visibility:hidden;
  }
  .clearfix {display:inline-block;}
  .clearfix {display:block;}
  g:not(svg) {
    transform-origin: 0px 0px;
  }
`;

export const AppLayout = ({ children }: Props): ReactElement => {
  return (
    <>
      <ResetStyle />
      <ResetFormStyle />
      <GlobalStyle />
      <div id="app">{children}</div>
    </>
  );
};
