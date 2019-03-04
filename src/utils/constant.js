export const CLIENT_ID = 'e791aa2a7a64b3f766a2';
export const CLIENT_SECRET = 'e80cde65c7071286086077892f3336bc2a3f4576';
export const PROXY = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';


export const MARKDOWN_EXAMPLE = 
`sdfs`;
// `在文字写书写不同数量的#可以完成不同的标题，如下：
// # 一级标题 
// ## 二级标题 
// ### 三级标题 
// #### 四级标题 
// ##### 五级标题 
// ###### 六级标题


// 等号及减号也可以进行标题的书写，等号代表一级标题，减号代表二级标题，并且需要写在文字的下面，减号及等号的数量不会影响标题的基数，如下：

// 一级标题 
// =========

// 二级标题 
// ---------

// 无序列表的使用，在符号“-”后加空格使用。如下：
// - 无序列表1 
// - 无序列表2 
// - 无序列表3

// 如果要控制列表的层级，则需要在符号“-”前使用空格。如下：
// - 无序列表1 
// - 无序列表2 
//   - 无序列表2.1 
//      - 列表内容 
//      - 列表内容

 

// 有序列表的使用，在数字及符号“.”后加空格几个，如下：
// 1. 有序列表1 
// 2. 有序列表2 
// 3. 有序列表3 

// 引用的格式是使用符号“>”后面书写文字，及可以使用引用。如下：
// >这个是引用 

// > 是不是和电子邮件中的 

// > 引用格式很像


// 粗体的使用是在需要加粗的文字前后各加两个“*”，而斜体的使用则是在需要斜体的文字前后各加一个“*”，如果要使用粗体和斜体，那么就是在需要操作的文字前后各加三个“*”。如下：
// **这个是粗体** 
// *这个是斜体* 
// ***这个是粗体加斜体***


// 在文中直接加链接，中括号中是需要添加链接的文字，圆括号中是需要添加的链接，如下：
// [link text](http://example.com/ "optional title")

// 在引用中加链接，第一个中括号添加需要添加的文字，第二个中括号中是引用链接的id，之后在引用中，使用id加链接：如下：
// [link text][id] 
// [id]: http://example.com/ "optional title here"

// 在文中直接引用链接，直接使用尖括号，把链接加入到尖括号中就可以实现，如下：
// <http://example.com/> or <address@example.com> 
// 插入互联网上图片，格式如下：
// ![这里写图片描述](https://user-images.githubusercontent.com/13995641/46252312-c8a38480-c499-11e8-8e91-3aba030facf6.jpg)
// ![这里写图片描述][jane-eyre-douban] 

// 用TAB键起始的段落，会被认为是代码块，如下：
//     <php> 
//         echo “hello world"; 
//     </php>

// 如果在一个行内需要引用代码，只要用反引号\`引起来就好，如下：

// Use the \`printf()\`  function.

// 可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，同时需要在分隔线的上面空一行。如下：

// --- 
// **** 
// ___

// 删除线的使用，在需要删除的文字前后各使用两个符合“~”，如下
// ~~Mistaken text.~~


// 在需要高亮的代码块的前一行及后一行使用三个反引号“\`”，同时第一行反引号后面表面代码块所使用的语言，如下：

// \`\`\`java
// #FileName: HelloWorld.java  
// public class HelloWorld   #如果有 public 类的话，类名必须和文件同名，注意大小写  
// {  
//   #Java 入口程序，程序从此入口  
//   public static void main(String[] args)  
//   {  
//   #向控制台打印一条语句  
//     System.out.println("Hello,World!");  
//   }  
// } 
// \`\`\`

// \`\`\`js
// var sys = require("sys");    #导入需要的 sys 模块  
// sys.puts("Hello,World!");    #调用里面的 puts 函数来打印字符串   
// \`\`\`

// \`\`\`cpp
// #include <stdio.h>  
// int main()                #main 入口函数  
// {  
//   printf("Hello,World!"); #printf 函数打印  
//   return 1;               #函数返回值  
// }  
// \`\`\`

// 可以使用冒号来定义表格的对齐方式，如下：

// | Tables | Are | Cool | 
// | ------------- |:-------------:| -----:| 
// | col 3 is | right-aligned | $1600 | 
// | col 2 is | centered | $12 | 
// | zebra stripes | are neat | $1 |`