
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[emp](
	[name] [nvarchar](50) NULL,
	[id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[surname] [nvarchar](50) NULL,
	[patternname] [nvarchar](50) NULL,
 CONSTRAINT [PK_emp] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[w_material]    Script Date: 26.11.2019 23:57:44 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[w_material](
	[idw] [numeric](18, 0) NOT NULL,
	[material] [nvarchar](50) NULL,
	[price] [numeric](18, 0) NULL,
	[id] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
 CONSTRAINT [PK_w_material] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[emp] ON 

GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Алексей', CAST(1 AS Numeric(18, 0)), N'Алексеев', N'Алексеевич')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Иван', CAST(2 AS Numeric(18, 0)), N'Иванов', N'Иванович')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Олег', CAST(3 AS Numeric(18, 0)), N'Сидоров', N'Иванович')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Тест', CAST(4 AS Numeric(18, 0)), N'Тестов', N'Тестович')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Пвацукцук', CAST(5 AS Numeric(18, 0)), N'Пцукцкуц', N'ИЫцвцукцук')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Лвиалойцу', CAST(6 AS Numeric(18, 0)), N'Тцщукцук', N'Чщыщцуккк')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Лшавцкцуки', CAST(7 AS Numeric(18, 0)), N'Тчлаыварыв', N'Зоываьывьа')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Твава', CAST(8 AS Numeric(18, 0)), N'Кцувыук', N'Пыывываыва')
GO
INSERT [dbo].[emp] ([name], [id], [surname], [patternname]) VALUES (N'Fsdfsdf', CAST(9 AS Numeric(18, 0)), N'Tsdfsdf', N'Мываыццц')
GO
SET IDENTITY_INSERT [dbo].[emp] OFF
GO
SET IDENTITY_INSERT [dbo].[w_material] ON 

GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(2 AS Numeric(18, 0)), N'АПУЦК', CAST(3450 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(2 AS Numeric(18, 0)), N'Кываыыы', CAST(6000 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(2 AS Numeric(18, 0)), N'УЦываттттт', CAST(45000 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(2 AS Numeric(18, 0)), N'Сфыфыв', CAST(422 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(1 AS Numeric(18, 0)), N'Свыаываффф', CAST(3288 AS Numeric(18, 0)), CAST(6 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(1 AS Numeric(18, 0)), N'Оцукцук', CAST(4553 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(3 AS Numeric(18, 0)), N'Сфыррыва', CAST(45220 AS Numeric(18, 0)), CAST(8 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(4 AS Numeric(18, 0)), N'Мвукцук', CAST(6700 AS Numeric(18, 0)), CAST(9 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(4 AS Numeric(18, 0)), N'ИЫФваыв', CAST(6700 AS Numeric(18, 0)), CAST(11 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(4 AS Numeric(18, 0)), N'Кываыва', CAST(2552 AS Numeric(18, 0)), CAST(12 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(3 AS Numeric(18, 0)), N'Мываыв', CAST(745 AS Numeric(18, 0)), CAST(13 AS Numeric(18, 0)))
GO
INSERT [dbo].[w_material] ([idw], [material], [price], [id]) VALUES (CAST(8 AS Numeric(18, 0)), N'Тываывыы', CAST(3457 AS Numeric(18, 0)), CAST(14 AS Numeric(18, 0)))
GO
SET IDENTITY_INSERT [dbo].[w_material] OFF
GO
