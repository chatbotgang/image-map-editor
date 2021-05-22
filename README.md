# Image Map Editor

## 說明

這個前端作業是使用 `Create React App` 建立，請依照說明要求完成指定功能與畫面

## 說明

### 圖示
圖一
<img src="./src/assets/q1.jpg" />
圖二
<img src="./src/assets/q2.jpg" />

### 說明文字
1. 用 React.js 實現一個 SPA，該 SPA 可以讓使用者從本地選擇一張不限尺寸的圖片顯示於畫面上
2. 選擇的圖片會顯示於畫面左側預覽中（如圖二左），圖片縮放到寬 355px，高則根據寬度換算的比例來換算高度
3. 使用者可以在圖片預覽區塊內選取任意數量的矩形區域，選取到的區域座標會映射回圖片本身的尺寸顯示於畫面右側區塊，顯示的方式要有基本的縮排（如圖二右）
4. 使用者可以刪除矩形選取區塊，刪除後右側對應的座標資料需要一併消失


## 基本要求
- 請 fork `develop` branch，完成之後請開 PR 到 `develop` branch 提交此作業
- 請使用 TypeScript 開發
- 請使用 `React hooks` 來實作
- 如果必要的話，可以使用第三方套件（請使用 yarn 安裝）
- 顯示樣式盡量貼近說明圖示樣式，但以功能完成度為優先

## 實作筆記

### 資料結構

目前看起來需要一個 mapping 資訊的陣列，並作為 global state 提供給其他組件使用，目前需要用的人是 `ImageMapDisplayer`

```ts
type Mapping = {
  x: number;
  y: number;
  width: number;
  height: number;
};
```

另外圖片上傳不確定是否有需要分享，為求簡單可以直接將 image 當作 ImageMapEditor 的 local state ，但考慮到 `Mapping` 如果失去原始圖片就毫無意義，還是將 image 拉到 global 層級比較好，在有真正 server 的情境下可能可以考慮用上傳後的網址或資料庫 id 作為辨識。這裡只是作業，所以直接用 base64 字串存著吧。

```ts
type Base64Image = string;
```

### 狀態管理

考慮上述，會將 `Base64Image` 以及 `List<Mapping>` 都送到 global state ，目前專案小就用上層 App.tsx 傳下去的 state 就好了，沒有使用 context 甚至 redux 等等狀態管理工具的必要。

### 預計規劃元件

- 畫面左側 `ImageMapEditor`
  - `ImageUploader`
  - 點擊拖曳產生選取的方塊 `MappingBlock`
- 畫面右側 `ImageMapDisplayer`

### 事件

`ImageMapEditor`

1. **UploadImage**
2. **CreateMapping**

`MappingBlock`

1. **EditMapping** (nice to have)