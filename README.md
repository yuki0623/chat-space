## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|email|text|null: false|
|name|text|null: false|
### Association
- has_many :groups, through: :groups_users
- has_many :groups_users
- has_many :messages


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
｜name｜text|null: false|
### Association
- has_many :users,through: :groups_users
- has_many :groups_users
- has_many :messages


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|comment|text|
|image|string|
|user_id|integer|null: false, foreign_key: true||group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group
