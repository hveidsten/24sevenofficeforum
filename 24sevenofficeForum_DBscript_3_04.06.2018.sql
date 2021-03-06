USE [master]
GO
/****** Object:  Database [24hOfficeforum]    Script Date: 04.06.2018 08.36.49 ******/
CREATE DATABASE [24hOfficeforum]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'24hOfficeforum', FILENAME = N'C:\Users\Get IT PC\24hOfficeforum.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'24hOfficeforum_log', FILENAME = N'C:\Users\Get IT PC\24hOfficeforum_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [24hOfficeforum] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [24hOfficeforum].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [24hOfficeforum] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [24hOfficeforum] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [24hOfficeforum] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [24hOfficeforum] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [24hOfficeforum] SET ARITHABORT OFF 
GO
ALTER DATABASE [24hOfficeforum] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [24hOfficeforum] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [24hOfficeforum] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [24hOfficeforum] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [24hOfficeforum] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [24hOfficeforum] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [24hOfficeforum] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [24hOfficeforum] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [24hOfficeforum] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [24hOfficeforum] SET  DISABLE_BROKER 
GO
ALTER DATABASE [24hOfficeforum] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [24hOfficeforum] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [24hOfficeforum] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [24hOfficeforum] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [24hOfficeforum] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [24hOfficeforum] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [24hOfficeforum] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [24hOfficeforum] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [24hOfficeforum] SET  MULTI_USER 
GO
ALTER DATABASE [24hOfficeforum] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [24hOfficeforum] SET DB_CHAINING OFF 
GO
ALTER DATABASE [24hOfficeforum] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [24hOfficeforum] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [24hOfficeforum] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [24hOfficeforum] SET QUERY_STORE = OFF
GO
USE [24hOfficeforum]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
USE [24hOfficeforum]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 04.06.2018 08.36.49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Answer]    Script Date: 04.06.2018 08.36.50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Answer](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Upvote] [int] NULL,
	[Body] [varchar](max) NOT NULL,
	[QuestionId] [int] NOT NULL,
	[AnswerCreated] [datetime] NULL,
 CONSTRAINT [PK_Answer_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Category]    Script Date: 04.06.2018 08.36.50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [varchar](max) NOT NULL,
	[Description] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Category_1] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ForumUser]    Script Date: 04.06.2018 08.36.50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ForumUser](
	[Id] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
	[UserName] [nvarchar](100) NULL,
	[Email] [nvarchar](100) NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[Company] [nvarchar](100) NULL,
	[PasswordSalt] [binary](64) NULL,
	[Passwordhash] [nvarchar](max) NULL,
	[UserVote] [int] NULL,
 CONSTRAINT [PK_ForumUser] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Question]    Script Date: 04.06.2018 08.36.50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Question](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Upvote] [int] NULL,
	[Header] [varchar](max) NOT NULL,
	[Body] [varchar](max) NOT NULL,
	[CategoryId] [int] NOT NULL,
	[QuestionCreated] [datetime] NULL,
 CONSTRAINT [PK_Question] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Vote]    Script Date: 04.06.2018 08.36.50 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Vote](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[VoteID] [int] NOT NULL,
	[AnswerVoteId] [int] NOT NULL,
	[QuestionVoteId] [int] NOT NULL,
	[UserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Vote] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Answer] ON 

INSERT [dbo].[Answer] ([Id], [Upvote], [Body], [QuestionId], [AnswerCreated]) VALUES (3, 1, N'Endret fra postman for å teste PATCH', 2010, CAST(N'2015-11-04T18:06:25.000' AS DateTime))
INSERT [dbo].[Answer] ([Id], [Upvote], [Body], [QuestionId], [AnswerCreated]) VALUES (4, 1, N'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 2009, CAST(N'2018-11-04T18:06:25.000' AS DateTime))
INSERT [dbo].[Answer] ([Id], [Upvote], [Body], [QuestionId], [AnswerCreated]) VALUES (1002, 2, N'asdsadad', 2014, CAST(N'2018-11-04T18:06:25.000' AS DateTime))
INSERT [dbo].[Answer] ([Id], [Upvote], [Body], [QuestionId], [AnswerCreated]) VALUES (1004, 1, N'1234 Test', 2022, CAST(N'2018-11-04T18:06:25.000' AS DateTime))
INSERT [dbo].[Answer] ([Id], [Upvote], [Body], [QuestionId], [AnswerCreated]) VALUES (1005, 2, N'spørsmål test', 2017, CAST(N'2018-11-04T18:06:25.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Answer] OFF
SET IDENTITY_INSERT [dbo].[Category] ON 

INSERT [dbo].[Category] ([Id], [CategoryName], [Description]) VALUES (3, N'Kategori 1', N'Alt som tilhører spørsmål for Kategori 1 går her')
INSERT [dbo].[Category] ([Id], [CategoryName], [Description]) VALUES (4, N'Kategori 2', N'Alt som tilhører spørsmål for Kategori 2')
INSERT [dbo].[Category] ([Id], [CategoryName], [Description]) VALUES (5, N'Kategori 3', N'Alt som tilhører spørsmål for Kategori 3')
INSERT [dbo].[Category] ([Id], [CategoryName], [Description]) VALUES (6, N'Kategori 4', N'Alt som tilhører spørsmål for Kategori 4')
INSERT [dbo].[Category] ([Id], [CategoryName], [Description]) VALUES (8, N'Kategori 5', N'Alt som tilhører spørsmål for Kategori 5')
SET IDENTITY_INSERT [dbo].[Category] OFF
SET IDENTITY_INSERT [dbo].[Question] ON 

INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2009, 2, N'spørsmål med endring', N'innhold', 3, CAST(N'2018-11-04T17:00:46.000' AS DateTime))
INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2010, 1, N'Nunc nisl.', N'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.

Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.', 6, CAST(N'2018-11-04T18:00:25.000' AS DateTime))
INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2013, 1, N'Duis bibendum', N'Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.","body":"Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus', 3, CAST(N'2018-10-04T17:45:54.000' AS DateTime))
INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2014, 2, N'Sed sagittis', N'Endret igjen med patch fra postman.', 6, CAST(N'2018-10-04T17:46:14.000' AS DateTime))
INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2017, 2, N' Proin risus. Praesent lectus.', N'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis.', 4, CAST(N'2018-01-10T08:49:32.000' AS DateTime))
INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2018, 1, N'Suspendisse potenti.', N'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. ', 4, CAST(N'2018-01-12T10:46:21.000' AS DateTime))
INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2019, 1, N'Aenean sit amet justo', N'Morbi ut odio.","body":"Phasellus in felis. Donec semper sapien a libero. Nam dui.', 3, CAST(N'2018-01-12T11:12:05.000' AS DateTime))
INSERT [dbo].[Question] ([Id], [Upvote], [Header], [Body], [CategoryId], [QuestionCreated]) VALUES (2022, 2, N' Nam dui.', N' Maecenas tincidunt lacus at velit. ', 8, CAST(N'2018-01-12T20:12:05.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[Question] OFF
ALTER TABLE [dbo].[Answer]  WITH CHECK ADD  CONSTRAINT [FK_Answer_Question] FOREIGN KEY([QuestionId])
REFERENCES [dbo].[Question] ([Id])
GO
ALTER TABLE [dbo].[Answer] CHECK CONSTRAINT [FK_Answer_Question]
GO
ALTER TABLE [dbo].[Question]  WITH CHECK ADD  CONSTRAINT [FK_Question_Category] FOREIGN KEY([CategoryId])
REFERENCES [dbo].[Category] ([Id])
GO
ALTER TABLE [dbo].[Question] CHECK CONSTRAINT [FK_Question_Category]
GO
USE [master]
GO
ALTER DATABASE [24hOfficeforum] SET  READ_WRITE 
GO
